from flask import current_app, request
from social.backends.saml import SAMLAuth, SAMLIdentityProvider
from social.exceptions import AuthMissingParameter


class SharedemosSAMLAuth(SAMLAuth):

    def generate_saml_config(self, idp):
        """
        Generate the configuration required to instantiate OneLogin_Saml2_Auth.
        """
        # The shared absolute URL that all IdPs redirect back to -
        # this is specified in our metadata.xml:
        abs_completion_url = self.redirect_uri
        config = {
            'contactPerson': {
                'technical': self.setting('TECHNICAL_CONTACT'),
                'support': self.setting('SUPPORT_CONTACT')
            },
            'debug': True,
            'idp': idp.saml_config_dict,
            'organization': self.setting('ORG_INFO'),
            'security': {
                'metadataValidUntil': '',
                'metadataCacheDuration': 'P10D',  # metadata valid for ten days
            },
            'sp': {
                'assertionConsumerService': {
                    'url': abs_completion_url,
                    # python-saml only supports HTTP-POST
                    'binding': 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
                },
                'entityId': self.setting('SP_ENTITY_ID'),
                'x509cert': self.setting('SP_PUBLIC_CERT'),
                'privateKey': self.setting('SP_PRIVATE_KEY'),
            },
            'strict': False,  # We must force strict mode - for security
        }
        config["security"].update(self.setting("SECURITY_CONFIG", {}))
        config["sp"].update(self.setting("SP_EXTRA", {}))
        return config

    def get_user_id(self, details, response):
        """
        Get the permanent ID for this user from the response.
        We prefix each ID with the name of the IdP so that we can
        connect multiple IdPs to this user.
        """
        idp = self.get_idp(response['idp_name'])
        uid = response['attributes']['name_id']
        return '{}:{}'.format(idp.name, uid)

    def auth_url(self, hash_url=None):
        """Get the URL to which we must redirect in order to
        authenticate the user"""
        try:
            idp_name = self.strategy.request_data()['idp']
            if hash_url:
                idp_name = str(idp_name) + ":" + hash_url
        except KeyError:
            raise AuthMissingParameter(self, 'idp')
        auth = self._create_saml_auth(idp=self.get_idp(idp_name))
        # Below, return_to sets the RelayState, which can contain
        # arbitrary data.  We use it to store the specific SAML IdP
        # name, since we multiple IdPs share the same auth_complete
        # URL.
        return auth.login(return_to=idp_name)

    def start(self, hash_url=None):
        # Clean any partial pipeline info before starting the process
        self.strategy.clean_partial_pipeline()
        if self.uses_redirect():
            return self.strategy.redirect(self.auth_url(hash_url))
        else:
            return self.strategy.html(self.auth_html())

    def get_idp(self, idp_name):
        """Given the name of an IdP, get a SAMLIdentityProvider instance"""
        idp_name = idp_name.split(':')[0]

        if not idp_name:
            idp_name = request.view_args.get('usergroup')
            idp_name = idp_name or 'default'

        idp_config = self.setting('ENABLED_IDPS')[idp_name]
        return SharedemosSAMLIdentityProvider(idp_name, **idp_config)


class SharedemosSAMLIdentityProvider(SAMLIdentityProvider):

    # Attributes processing:
    def get_user_details(self, attributes):
        """
        Given the SAML attributes extracted from the SSO response, get
        the user data like name.
        """
        user_attributes = super(SharedemosSAMLIdentityProvider,
                                self).get_user_details(attributes)

        for field in current_app.config['SOCIAL_AUTH_USER_FIELDS']:
            if field not in user_attributes:
                user_attributes[field] = self.get_attr(
                    attributes, 'attr_' + field, '')
        return user_attributes

    def get_attr(self, attributes, conf_key, default_attribute):
        """
        Internal helper method.
        Get the attribute 'default_attribute' out of the attributes,
        unless self.conf[conf_key] overrides the default by specifying
        another attribute to use.
        """
        key = self.conf.get(conf_key, default_attribute)
        value = attributes[key] if key in attributes else None
        if isinstance(value, list) and len(value) == 1:
            return value[0]

        return value

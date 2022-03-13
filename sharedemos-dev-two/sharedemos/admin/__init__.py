from flask.ext.admin import Admin

from .apps import (
    ApplicationView,
    BulletinBoardAppView,
    SampleExchangeAppView
)
from .cta import CTAView, SectionCTAView
from .language import (
    LanguageView,
    SupportedLanguageView
)
from .mailer import MailerView
from .section import SectionView
from .tag import TagView
from .tenant import (
    TenantAppsView,
    TenantFlagView,
    TenantFooterView,
    TenantHeaderView,
    TenantView
)
from .user import (
    UserView,
    UserGroupView
)

from sharedemos.models import (
    Application,
    BulletinBoard,
    Languages,
    LeadCTAForm,
    MailDigest,
    Section,
    SectionCTA,
    SampleExchange,
    Tag,
    Tenant,
    TenantApplication,
    TenantFlags,
    TenantFooter,
    TenantHeader,
    TenantLanguage,
    User,
    UserGroup,
    db
)


def configure(app):
    admin = Admin(app, name="Sharedemos Admin", template_mode="bootstrap3")
    admin.add_view(ApplicationView(Application, db.session,
                   name="List", category="Apps"))
    admin.add_view(
        BulletinBoardAppView(BulletinBoard, db.session,
                             name="Bulletin Board", category="Apps")
    )
    admin.add_view(
        SampleExchangeAppView(SampleExchange, db.session,
                              name="Samples", category="Apps")
    )
    admin.add_view(CTAView(LeadCTAForm, db.session, name="CTA"))
    admin.add_view(
        LanguageView(Languages, db.session, name="List", category="Languages")
    )
    admin.add_view(
        SupportedLanguageView(TenantLanguage, db.session,
                              name="Supported", category="Languages")
    )
    admin.add_view(MailerView(MailDigest, db.session, name="Mailers"))
    admin.add_view(SectionView(Section, db.session,
                               name="List", category="Section"))
    admin.add_view(SectionCTAView(SectionCTA, db.session,
                   name="Map CTA", category="Section"))
    admin.add_view(TagView(Tag, db.session, name="Tag"))
    admin.add_view(
        TenantView(Tenant, db.session, name="List", category="Tenant")
    )
    admin.add_view(
        TenantAppsView(TenantApplication, db.session,
                       name="Apps", category="Tenant")
    )
    admin.add_view(
        TenantFlagView(TenantFlags, db.session,
                       name="Flags", category="Tenant")
    )
    admin.add_view(
        TenantFooterView(TenantFooter, db.session,
                         name="Footer", category="Tenant")
    )
    admin.add_view(
        TenantHeaderView(TenantHeader, db.session,
                         name="Header", category="Tenant")
    )
    admin.add_view(UserView(User, db.session, name="List", category="User"))
    admin.add_view(UserGroupView(UserGroup, db.session,
                                 name="Groups", category="User"))

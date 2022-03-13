"""Base classes for db models."""
from datetime import datetime

from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy.ext.hybrid import hybrid_method, hybrid_property

db = SQLAlchemy()


class Base(db.Model):
    """
    Base class for all SqlAlchemy models.

    Contains common hybrid properties, methods.
    """

    __abstract__ = True

    def as_dict(self):
        """Return model properties in dict format."""
        result = dict()
        for c in self.__table__.columns:
            value = getattr(self, c.name)
            if isinstance(value, datetime):
                value = value.isoformat()
            result[c.name] = value
        return result

    def duplicate(self, exclude_columns=None):
        """
        Function for duplicating the existing db object.

        exclude_columns: list of columns that are excluding
        in creating new db object ex: id, created_at
        """
        if not exclude_columns:
            exclude_columns = []

        exclude_columns += ["id", "created_at"]
        data = self.as_dict()
        for attr in exclude_columns:
            data.pop(attr, None)

        new_obj = self.__class__(**data)
        return new_obj


class TagBase(Base):
    """Base class for sqlalchemy models which contains tags."""

    __abstract__ = True

    def get_tags(self):
        """Return all tags for a given translation object."""
        tags = []
        if self.tag_ids:
            from sharedemos.models import Tag
            tags = Tag.query.filter(
                Tag.id.in_(self.tag_ids)
            ).with_entities(
                Tag.name
            ).all()

            tags = [_t.name for _t in tags]
        return tags


class ExpiryBase(Base):
    """
    Base class for SqlAlchemy models which supports expiry date.

    Contains common hybrid properties, methods.
    """

    __abstract__ = True

    def get_expiry_job(self):
        """Return the end-of-life expiry associated with this model."""
        from sharedemos.models import ExpiryJob
        expiry_job = ExpiryJob.query.filter(
            ExpiryJob.tenant_id == self.tenant_id,
            ExpiryJob.entity_type == unicode(self.__tablename__.lower()),
            ExpiryJob.entity_id == self.id
        ).first()
        return expiry_job or ExpiryJob(
            tenant_id=self.tenant_id,
            entity_type=unicode(self.__tablename__.lower()),
            entity_id=self.id
        )

    @hybrid_property
    def expire_at(self):
        """
        Return the end-of-life expiry associated with this model.

        If not found, then return a new eol object.
        """
        if not getattr(self, 'expiry_job', None):
            self.expiry_job = self.get_expiry_job()
        if not self.expiry_job.is_deleted:
            return self.expiry_job.expire_at
        return None


class I18nBase(Base):
    """
    Translation class for all SqlAlchemy models.

    Contains common hybrid properties, methods.
    """

    __abstract__ = True

    @hybrid_method
    def get_name(self, locale=None):
        """
        Return the model's name associated with the locale.

        If provided locale's name is not found,
        return default tenant_locale's name,
        """
        translation = self.get_translation(locale)
        return unicode(
            getattr(translation, 'title', getattr(translation, 'name', ''))
        )

    @hybrid_method
    def get_locale_translation(self, locale):
        """Return locale translation for model if available else None."""
        tenant = self.tenant
        for translation in self.translations:
            if translation.language_id == locale:
                if locale == tenant.default_locale_id or\
                        locale in [l.language_id
                                   for l in tenant.tenant_languages
                                   if l.is_public]:
                    return translation

    @hybrid_method
    def get_default_translation(self):
        """Return default translation for a given model."""
        tenant = self.tenant
        for translation in self.translations:
            if translation.language_id == tenant.default_locale_id:
                return translation

    @hybrid_method
    def get_translation(self, locale=None):
        """
        Check for the locale translation.

        If locale translation is available, return locale translation
        If not locale translation, return default translation
        """
        translation = None
        if locale:
            translation = self.get_locale_translation(locale)
        if not translation:
            translation = self.get_default_translation()

        return translation

from flask import current_app


class CacheManager(object):
    """Generate keys, save and delete data from cache for a given key."""

    """
        https://redis.io/topics/data-types-intro#redis-keys
        Format: <tenant_id>:<category>:<language>:<user_id>:<object_id>
            keep constant values in upper case(user_id/section/product)
            in case if not present
        Ex:
            section for logged in user
                1:section:en_US:1012:main-category
            section for anonymous user
                2:chapter:en_US:anonymous:main-category
            product for anonymous user
                2:section:en_US:anonymous
            supported languages
                2:supported-languages
            tenant info
                2:tenant:ja_JP
    """

    redis_cache = None
    strict_redis_cache = None
    tenant_id = None

    def __init__(self, tenant_id=None):

        self.tenant_id = tenant_id
        if not self.tenant_id:
            self.tenant_id = getattr(current_app, "tenant_id", None)

        if not self.redis_cache:
            self.redis_cache = getattr(current_app, 'cache', None)

        if not self.strict_redis_cache:
            self.strict_redis_cache = getattr(current_app, "strict_redis", None)

    def add(self, category, data, **kwargs):
        key = self.build_key(category, **kwargs)
        self.redis_cache.set(key, data)

    def clear(self):
        for _k in self.get_all_keys():
            self.strict_redis_cache.delete(_k)

    def get(self, category, **kwargs):
        key = self.build_key(category, **kwargs)
        return self.redis_cache.get(key)

    def get_all_keys(self, category=None, **kwargs):
        key = "{}".format(self.tenant_id)
        if category:
            key = "{}:{}".format(key, category)

        if "object_id" in kwargs:
            key = "{}:*:{}".format(key, kwargs["object_id"])

        key += "*"

        print key

        return [_k for _k in self.strict_redis_cache.keys(key)]

    def build_key(self, category, **kwargs):
        """Build cache key."""
        """
            Possible options:
            <tenant_id>:<category>:<language>:<user_id>:<object_id_or_slug>

            1:section:en_US:1012:main-category (section for logged in user)
            1:chapter:en_US:anonymous:lorem    (walkthrough for anonymous user)
            2:section:en_US:anonymous          (product for anonymous user)
            4:tenant:ja_JP                     (tenant info)
            2:supported-languages              (supported languages)

        """
        key = "{}:{}".format(self.tenant_id, category)
        if "language" in kwargs:
            key = "{}:{}".format(key, kwargs["language"])

        if "object_id" in kwargs:
            user_id = "anonymous"
            if "user_id" in kwargs:
                user_id = kwargs["user_id"]
            key = "{}:{}:{}".format(key, user_id, kwargs["object_id"])

        return key

    def remove(self, category, **kwargs):
        keys = self.get_all_keys(category, **kwargs)
        for _k in keys:
            self.strict_redis_cache.delete(_k)

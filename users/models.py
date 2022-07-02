from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from pandas import notnull


class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, password, **other_fields)

    def create_user(self, email, password, **other_fields):
        user = self.model(email=email, **other_fields)
        user.set_password(password)
        user.save()
        return user


class NewUser(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(unique=True)
    mobile = models.CharField(max_length=10)
    name = models.CharField(max_length=150, blank=True)
    address = models.TextField(max_length=500, default="")
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    register_date = models.DateTimeField(default=timezone.now)
    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email+" "+self.name+" "+self.mobile


class Orders(models.Model):
    email = models.EmailField()
    mobile = models.CharField(max_length=10)
    name = models.CharField(max_length=200)
    ordered_at = models.DateTimeField(auto_now_add=True)
    picked = models.BooleanField(default=False)
    has_tracking_id = models.BooleanField(default=False)
    tracking_id = models.CharField(max_length=200, default="will update soon")
    address = models.TextField(blank=True)

    REQUIRED_FIELDS = ['mobile']

    def __str__(self):
        return self.mobile+" "+self.name+" "+self.email

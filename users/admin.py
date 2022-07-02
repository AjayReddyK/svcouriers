from django.contrib import admin
from .models import NewUser, Orders
from django.contrib.auth.admin import UserAdmin


class OrderAdminConfig(admin.ModelAdmin):
    search_fields = ('id', 'email', 'mobile', 'name', 'ordered_at',
                      'tracking_id', 'user')
    list_filter = ( 'ordered_at',)
    ordering = ('-ordered_at', 'mobile')
    list_display = ('id', 'mobile', 'name', 'email', 'ordered_at', 'address',
                   'has_tracking_id', 'tracking_id')


class UserAdminConfig(UserAdmin):
    search_fields = ("email", "mobile", "name", "address")
    list_filter = ("name", "is_active", "is_staff", "register_date")
    ordering = ('-register_date',)
    list_display = ("id", 'email', 'mobile', 'name', 'is_active',
                    'is_staff', 'register_date')
    fieldsets = (
        (None, {'fields': ('email', 'mobile', 'name', 'address', 'register_date')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )


admin.site.register(NewUser, UserAdminConfig)
admin.site.register(Orders, OrderAdminConfig)
# Register your models here.

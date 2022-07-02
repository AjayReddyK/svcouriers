
from django.contrib import admin
from django.urls import path, include,re_path
from rest_framework_simplejwt.views import(
    TokenObtainPairView,
    TokenRefreshView,
)
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('users.urls', namespace='users')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/',include('djoser.urls')),
    path('auth/',include('djoser.urls.jwt')),
]

urlpatterns+=[re_path(r'^.*',TemplateView.as_view(template_name="index.html"))]
urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
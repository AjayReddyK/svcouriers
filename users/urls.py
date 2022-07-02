from django.urls import path
from .views import BlacklistTokenView, CustomUserCreate, OrderCreate, OrdersShow, ListOrders, OrderUpdate, Tracking, userType,GetUserDetails

app_name = 'users'

urlpatterns = [
    path('register/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenView.as_view(), name='blacklist'),
    path('createorder/', OrderCreate.as_view(), name='create_order'),
    path('listorders/', ListOrders.as_view(), name='list_orders'),
    path('showorders/', OrdersShow.as_view(), name='show_orders'),
    path('updateorder/', OrderUpdate.as_view(), name='order_update'),
    path('tracking/', Tracking.as_view(), name='show_tracking'),
    path('usertype/',userType.as_view(),name='user_type'),
    path('userdetails/',GetUserDetails.as_view(),name='user_details'),
]

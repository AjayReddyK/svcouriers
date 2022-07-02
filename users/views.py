from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterUserSerializer, OrderSerializer, OrderViewSerializer,UserShowSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Orders, NewUser
from bs4 import BeautifulSoup
import requests
from svcouriers_backend.settings import EMAIL_HOST_USER
from django.core.mail import send_mail

class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        reg_serializer = RegisterUserSerializer(data=request.data)
        if reg_serializer.is_valid():
            newuser = reg_serializer.save()
            if newuser:
                return Response(status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# Create your views here.

class GetUserDetails(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        user = request.user
        email = user.email
        queryset = NewUser.objects.get(email=email)
        print(queryset)
        userset = UserShowSerializer(queryset)
        return Response(userset.data,status=status.HTTP_200_OK)

class OrderCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        order_serializer = OrderSerializer(data=request.data)
        if order_serializer.is_valid():
            newuser = order_serializer.save()
            if newuser:
                try:
                    print("before sending mail")
                    send_mail(
                        subject='New Order !!',
                        message='A New order has been placed\nName : '+newuser.name+"\nMobile : "+newuser.mobile+"\nEmail : "+newuser.email+"\n Address : "+newuser.address,
                        from_email=EMAIL_HOST_USER,
                        recipient_list=[EMAIL_HOST_USER],
                        fail_silently=False,
                    )
                    print("after sending 1 st mail")
                    send_mail(
                        subject='Pickup request Received',
                        message='Your pick up request is successfully placed. We will contact you shortly !',
                        from_email=EMAIL_HOST_USER,
                        recipient_list=[newuser.email],
                        fail_silently=False,
                    )
                    print("after sending 2 nd mail")
                except:
                    print("in except do nothing")
                return Response(status=status.HTTP_201_CREATED)
        return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlacklistTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response("successful", status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class OrdersShow(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        email = user.email
        queryset = Orders.objects.filter(email=email)
        orderset = OrderViewSerializer(queryset, many=True)
        return Response(orderset.data)


class ListOrders(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        queryset = Orders.objects.order_by("ordered_at")
        orderset = OrderViewSerializer(queryset, many=True)
        return Response(orderset.data)


class OrderUpdate(APIView):
    permission_classes = [IsAdminUser]

    def put(self, request):
        print(request.data)
        a = request.data['pk']
        object = Orders.objects.filter(pk=a).first()
        order = OrderViewSerializer(object, data=request.data)
        if(order.is_valid()):
            a = order.save()
            return Response(order.data)
        return Response(order.errors, status=status.HTTP_400_BAD_REQUEST)

class userType(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        if(request.user.is_staff):
            print("admin")
            return Response("admin")
        else:
            return Response("user")

class Tracking(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        tracking_id = request.data['tracking_id']
        s = requests.Session()
        headers = {
            'User-agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0',
        }
        with s:
            url = "https://www.garudavega.com/gvtrack.php"
            payload = {'track': 'Track'}
            payload['trackingno'] = [tracking_id]
            print(payload)
            r = s.post(url, data=payload, headers=headers)
            print("request done")
            soup = BeautifulSoup(r.content, 'html5lib')
            result = soup.find('main', class_='clearfix content_animate slide content').find_all(
                'section', class_='clearfix wrapper')
            result = result[3]
            total = """<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="utf-8" />
    <base href="https://www.garudavega.com/" />
    <meta
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=1"
      name="viewport"
    />
    <title>Tracking Details - Garudavega Courier Services - Worldwide</title>
    <meta content="" name="keywords" />
    <meta content="" name="description" />
    <link href="Content/images/favicon.ico" rel="shortcut icon" />
    <link href="Content/tool.css" rel="stylesheet" type="text/css" />
    <!---  Common Js [start] -->
    <script src="Scripts/jquery.min.js" type="text/javascript"></script>
    <!-- Facebook Pixel Code -->
    <script>
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js"
      );

      fbq("init", "284347448620511");
      fbq("track", "PageView");
    </script>
    <noscript></noscript>
  </head>
  <body>
  <div className="mt-3 ms-6">
    <a href="https:svcouriers.herokuapp.com" ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
</svg></a>
</div>
    <main class="clearfix content_animate slide content">"""
            total += str(result)
            total += """</main></body></html>"""
            print(total)
            return Response(total)

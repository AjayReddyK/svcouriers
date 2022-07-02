from rest_framework import serializers
from users.models import NewUser, Orders


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = ('email', 'password', 'name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = ('name', 'mobile', 'email', 'address')


class OrderViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = ('pk', 'name', 'mobile', 'email', 'address', 'ordered_at',
                  'picked', 'has_tracking_id', 'tracking_id', 'address')

class UserShowSerializer(serializers.ModelSerializer):
    class Meta:
        model=NewUser
        fields=('name','mobile','email')
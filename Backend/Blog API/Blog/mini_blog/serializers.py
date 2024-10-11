from rest_framework import serializers
from .models import Post


#Defining the serializer

class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Post
        fields = "__all__"
        read_only_fields = ['slug','author']

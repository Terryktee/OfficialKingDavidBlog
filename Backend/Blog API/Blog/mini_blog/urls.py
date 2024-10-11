from django.urls import path,include
from .views import PostList,PostDetail,PrivatePostList,PrivatePostDetail,LoginView
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),  # This line includes the DRF auth views
    path('api-auth/login/', obtain_auth_token),
    path('login/', LoginView.as_view(), name='login'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/posts/', PostList.as_view(), name='post-list'),  # Public access to list posts
    path('api/posts/<slug:slug>/', PostDetail.as_view(), name='post_detail'),  # Public access to retrieve a single post
    path('private/posts/', PrivatePostList.as_view(), name='private_post_list'),  # Authenticated access to create posts
    path('private/posts/<int:pk>/', PrivatePostDetail.as_view(), name='private_post_detail'),  # Authenticated access to update/delete a post
]
urlpatterns = format_suffix_patterns(urlpatterns)

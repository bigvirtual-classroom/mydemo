from django.conf.urls import include, url
from django.contrib import admin
import settings

urlpatterns = [
    # Examples:
    # url(r'^$', 'mysite.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'zjtest/index/$', 'zjtest.views.index'),
    url(r'zjtest/turnon/$', 'zjtest.views.turnon'),
    url(r'zjtest/turnoff/$', 'zjtest.views.turnoff'),
    url(r'zjtest/checkComStatus/$', 'zjtest.views.checkComStatus'),
    url(r'zjtest/checkAjaxStatus/$', 'zjtest.views.checkAjaxStatus'),
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_URL}),
    url(r'^zjtest/subcoding/$', 'zjtest.online_coding.submit_code'),
    url(r'^zjtest/torun/$', 'zjtest.online_coding.torun'),
]

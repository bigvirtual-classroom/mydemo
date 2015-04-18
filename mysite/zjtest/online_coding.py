# coding=utf-8
__author__ = 'clicoy'
from django.http import HttpResponse
import json
import os
import commands
CLASS_PATH = '/home/clicoy/user_class/'
JAVA_HOME = '/opt/java/jdk1.6.0_32'


def build(request):
    return HttpResponse()


def submit_code(request):
    code_str = request.POST["code"]
    class_name = request.POST["calssname"]
    if class_name == '':
        return HttpResponse(json.dumps({'status': 0}), content_type='application/json')
    print class_name
    print code_str
    # just demo , if not demo please use username to save files
    save_java_file(class_name, code_str, CLASS_PATH+"demo")
    # build java class
    build_java(class_name, CLASS_PATH+'demo')
    resp_data = {'status': 1, 'message': 'it ok'}
    return HttpResponse(json.dumps(resp_data), content_type='application/json')


def torun(request):
    class_name = request.POST["calssname"]
    if class_name == '':
        return HttpResponse(json.dumps({'status': 0}), content_type='application/json')
    print class_name
    back = run_java(class_name, CLASS_PATH+'demo')
    resp_data = {'status': 1, 'msg': back}
    return HttpResponse(json.dumps(resp_data), content_type='application/json')


def save_java_file(classname, code, path_root):
    try:
        if not os.path.exists(path_root):
            os.mkdir(path_root)
        java_file = open(path_root+'/'+classname+'.java', 'wb')
        java_file.write(code)
        java_file.close()
        return True
    except IOError:
        return False


def build_java(class_name, path_root):
    cmd = JAVA_HOME + '/bin/javac ' + path_root+'/'+class_name+'.java'
    back = commands.getoutput(cmd)
    print back
    return back


def run_java(class_name, path_root):
    cmd = JAVA_HOME + '/jre/bin/java -cp ' + path_root+' '+class_name
    back = commands.getoutput(cmd)
    # return back.replace('\n', '<br>')
    return back

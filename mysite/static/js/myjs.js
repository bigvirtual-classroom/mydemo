var langTools = ace.require("ace/ext/language_tools");
var editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.getSession().setMode("ace/mode/java");

editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true
});
// uses http://rhymebrain.com/api.html
editor.commands.on("afterExec", function (e) {
    if (e.command.name == "insertstring" && /^[\\.\(.]$/.test(e.args)) {
        editor.execCommand("startAutocomplete");
    }
});
var rhymeCompleter = {
    getCompletions: function (editor, session, pos, prefix, callback) {
        /* if (prefix.length === 0) { callback(null, []); return } */
        console.log("prefix" + prefix);
        /* $.getJSON(
         "http://rhymebrain.com/talk?function=getRhymes&word=" + prefix,
         function(wordList) {
         // wordList like [{"word":"flow","freq":24,"score":300,"flags":"bc","syllables":"1"}]
         callback(null, wordList.map(function(ea) {
         return {name: ea.word, value: ea.word, score: ea.score, meta: "rhyme"}
         }));
         }) */
        //$.getJSON("loadCodeNote.action?filePath=" + $("#input-projectpath").val() + "/" + $("#input-filename").val() + ".java", function (wordList) {
        //    console.log("@@@@@" + wordList);
        //    // wordList like [{"word":"flow","freq":24,"score":300,"flags":"bc","syllables":"1"}]
        //    callback(null, wordList.map(function (ea) {
        //        return {name: ea.word, value: ea.word, score: ea.score, meta: "rhyme"}
        //    }));
        //})
    }
}
langTools.addCompleter(rhymeCompleter);
var BASE_URL = basePath + 'zjtest/'


function getClassName(con) {
    return $.trim(con.substring(con.indexOf("public class ") + "public class ".length, con.indexOf("{")));
}
function submit_coding() {
    //编译
    var con = editor.getValue();
    var calssname = getClassName(con);
    if (calssname == undefined || calssname.length == 0) {
        alert("No public class")
        return;
    }
    $.post(BASE_URL+"subcoding/", {calssname: calssname, code: con}, function (data) {
        eval("var obj = " + data);
        console.log(data);
        if (obj.status == 1) {
            $(".coderun_result").html("<p>编译成功!</p>")
        } else {
          $(".coderun_result").html("<p>编译失败!</p>")
        }
    }, "text");
}
function submit_run_java() {
    //编译
    var con = editor.getValue();
    var calssname = getClassName(con);
    if (calssname == undefined || calssname.length == 0) {
        alert("No public class")
        return;
    }
    $.post(BASE_URL+"torun/", {calssname: calssname}, function (data) {
        eval("var obj = " + data);
        console.log(data);
        if (obj.status == 1) {
            $(".coderun_result").html('<xmp>'+obj.msg+'</xmp>')
        } else {
          $(".coderun_result").html("<xmp>编译失败!</xmp>")
        }
    }, "text");
}

$(document).ready(function () {

    $(".subbox>a").click(function () {
        if ($(this).hasClass("cur")) {
            return;
        } else {
            var theIndex = $(this).index();
            $(".subbox>a").removeClass();
            $(this).addClass("cur");
            $(".mainbox").children().hide().eq(theIndex).show();
        }
    });
    $(".tcclose").click(function(){
		$(this).parent().hide();
		$(".tcbg").hide();
		});

});



function crateHadoop(){
	$(".tcbg").show();
	$(".tcbox").show();
	
	
	}

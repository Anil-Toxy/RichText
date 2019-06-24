var doThis,setColor,ToggeleImg,GetImgLink,InsertImg,TextValidation,toggoleDisable,getHTMLFromContext,InsertVideo,toggleHyperlink,hyperLinkInsert; 
(function(){
    var imgUrl;
    var EditBox = document.getElementById('textArea');
    EditBox.contentEditable = "true";
    $("#imgfile").prop('disabled', false);
    $("#address").prop('disabled', true);
   
    $('[data-toggle="tooltip"]').tooltip();   


    $.fn.focusEnd = function() {
        $(this).focus();
        var tmp = $('<span />').appendTo($(this)),
            node = tmp.get(0),
            range = null,
            sel = null;
    
        if (document.selection) {
            range = document.body.createTextRange();
            range.moveToElementText(node);
            range.select();
        } else if (window.getSelection) {
            range = document.createRange();
            range.selectNode(node);
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
        tmp.remove();
        return this;
    }

    setColor = function (work,color) {
        $('#textArea').focusEnd(); 
      
        document.execCommand('styleWithCSS', false, true);
        document.execCommand(work, true, color);
    }

    doThis =  function (work,value){
        $('#textArea').focusEnd(); 
       var classchck =  $(this).hasClass("on-Active");
       var b = classchck ? true:false;
        $(this).toggleClass("on-Active");
        
        document.execCommand(work,b,value);           
    }
    
    ToggeleImg = function(){
        var link = $('#link:checked').val();
        var local = $('#local:checked').val();
        link ? $("#imgfile").prop('disabled', true):$("#imgfile").prop('disabled', false);
        local ? $("#address").prop('disabled', true):$("#address").prop('disabled', false);
    }

    GetImgLink =  function(event){
        if(event.target.files.length){
            imgUrl = URL.createObjectURL(event.target.files[0])
        }
    };
    
    function AddCssImg(w,h){
        if(w && h ){
            $('img').css({
                'width':w+'px' ,
                'height':h+'px'
            });
        }
    }

    InsertImg = function(){
        $('#validation').text('');
       var w =  $('#width');
       var h =  $('#height');
       var link = $('#link:checked').val();
       var local = $('#local:checked').val();
       var address = $('#address').val();
    
        if(link || local){
            var img = local ? imgUrl:link ? address:'';
            if(img){
                $('#textArea').focusEnd(); 
                document.execCommand("insertimage",true,img);
               
                $("#imgfile").val('');
                $("#address").val('');

                $("#imgfile").prop('disabled', false);
                $("#address").prop('disabled', true);

            }else{
                $('#validation').text('Please Select a Image');
            }
            
            AddCssImg(w.val(),h.val());
            w.val('');
            h.val('');
            
        } else{
             $('#validation').text('Please Select a Image');
            
        }
    }

    toggoleDisable = function(){
          EditBox.contentEditable = EditBox.isContentEditable ? false:true;
    }

    getHTMLFromContext = function(){
        var content = $('#textArea').html();
        console.log(content)

    }

    InsertVideo = function() {
        $('#textArea').focusEnd(); 
        var videoInput = $('#VideoAddress');
        var vidUrl = videoInput.val();
        var w =  $('#VideoWidth');
        var h =  $('#VideoHeight');
        if (vidUrl != null) {
            $('#textArea').focusEnd(); 
            let el = document.createElement("div");
            let url = vidUrl.replace("watch?v=", "embed/");
            let  width =  w.val() ? w.val() :350;
            let  height = h.val() ? h.val() : 300;
            var html = ' <iframe width="' + width +'" height="' + height +'" src="' + url +'?controls=1"> </iframe>';
            el.innerHTML = html;
            $('#textArea').append(el);
            $('#textArea').focusEnd(); 

            w.val('');
            h.val('');
            videoInput.val('');
        }
    };
    toggleHyperlink = function(){
        var linkOnly = $('#linkOnly:checked').val();
        var hyperlink = $('#hyperlink:checked').val();
        linkOnly ? $("#selected").prop('disabled', true):$("#selected").prop('disabled', false);
        hyperlink ? $("#selected").prop('disabled', false):$("#selected").prop('disabled', true);
    }
    hyperLinkInsert = function(){
        var href = $('#href');
        var selected = $('#selected');
        var linkOnly = $('#linkOnly:checked').val();
        var hyperlink = $('#hyperlink:checked').val();
        $('#textArea').focusEnd(); 
        if(href.val() && linkOnly){
            document.execCommand("insertHTML",false,"<a href='"+href.val()+"'>"+href.val()+"</a>");
        }
        if(href.val() && selected.val() && hyperlink){
            
        document.execCommand("insertHTML",false,"<a href='"+href.val()+"'>"+selected.val()+"</a>");
        }
        $('#textArea').focusEnd(); 
        href.val('');
    }
})();
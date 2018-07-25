$(document).ready(function(){ 
 var ArticleContainer = $(".article-container"); 
 $(document).on("click", ".btn.delete", handleArticleDelete); 
 $(document).on("click", ".btn.notes", handleArticlesNotes);
 $(document).on("click", ".btn.save", handleNoteSave);  
 $(document).on("click", ".btn.note-delete", handleNoteDelete); 

 initPage(); 

 function initPage(){ 
    articleContainer.empty(); 
    $.get("/api/headline?save=true")
    .then(function(data){ 
        if (data && data.length){ 
            renderArticles(data); 
        } 
        else{ 
            renderEmpty(); 
        }

        }); 
}

function renderArticles(articles){ 
    var articlePanels = []; 

    for (var i = 0; i < artilces.length; i++){ 
    articlePanels.push(createPanel(articles[i])); 
}
    articleContainer.append(articlePanels); 
}

function createPanel(article){ 
  
    var Panel = 
    $([ "<div class='panel panel-default'>", 
       "<div class='panel-heading'>", 
        "<h3>",
    article.headline, 
    "<a> class='btn btn-sucess save'>", 
    "From Saved",
    "<a>",
    "<a class='btn btn-info notes'>Article Notes</a>",  
    "<h3>", 
    "<div>", 
    "<div class='panel-body'>", 
    article.summary, 
    "</div>", 
    "</div>"
    ].join("")); 

    panel.data("_id", article.id); 
    return panel; 
    
}

function renderEmpty(){ 
    var emptyAlert = 
    $(["<div class='alert alert-warning text-center'>", 
        "<h4> Uh Oh. Looks like we don't have any new articles.</h4>", 
        "<div>", 
        "<div class='panel panel-default'>", 
        "<div class='panel-heading text-center'>", 
        "<h3>Would You Like to Browse Available Articles First?</h3>", 
        "<div>", 
        "<div class='panel-body text-center'>", 
        "<h4><a href='/'>Browse Articles</a></h4>", 
        "</div>", 
        "</div>"
    ].join("")); 
    articleContainer.append(emptyAlert); 
} 

function renderNotesList(data){ 
    var notesToRender = []; 
    var currentNote; 
    if (!data.notes.length){ 
        currentNote = [
            "<li class= 'list-group-item'>", 
            "No notes for this article yet.", 
            "</li>"
        ].join(""); 
        notesToRender.push(currentNote); 
    }
    else{ 

    for (var i = 0; i < data.notes.length; i++){ 
        currentNote = $([ 
            "<li class='list-group-item note'>", 
            data.notes[i].noteText,
            "<button class='btn btn-danger note-delete>x</button>", 
            "</li>"
        ].join("")); 
        currentNote.children("button").data("_id", data.notes[i]._id); 
        notesToRender.push(currentNote); 
    }
    }
    $(".note-container").append(notesToRender);

}

function handleArticleDelete() { 
    var articleToDelete = $(this).parents(".panel").data(); 

    $.ajax({ 
        method: "DELETE", 
        url: "/api/headlines/" + articleToDelete._id
    }).then(function(data){ 
        if (data.ok) { 
            initPage(); 
        }
    }); 
} 

function handleArticlesNotes(){ 
    var currentArticle = $(this).parents("panel").data(); 
    $.get("api/notes/"+ currentArticle._id).then(function(data){ 
        var modalText = [ 
            "<div class='container-fluid text-center'>", 
            "<h4>Notes For Article: ", 
            currentArticle._id,
            "</h4>", 
            "<hr/>", 
            "<ul class='list-group note-container'",
            "</ul>", 
            "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
            "<button class='btn btn-success save'>Save Note</button>",
            "</div>"
        ].join(""); 

        bootbox.dialog({
            message: modalText, 
            closeButton: true
        }); 
        var noteData = { 
            _id: currentArticle._id, 
            notes: data || []
        }; 
        $(".btn.save").data("article", noteData); 
        renderNotesList(noteData); 
    }); 
}

function handleNoteSave(){ 
    var noteData; 
    var newNote = $(".bootbox-body textarea").val().trim(); 

    if(newNote){ 
        noteData = { 
            _id: $(this).data("article")._id,
        noteText: newNote
        }; 
        $.post("/api/notes", noteData).then(function(){ 
            bootbox.hideAll(); 
    }); 
    }
}

function handleNoteDelete(){ 
    var noteToDelete = $(this).data("_id"); 

    $.ajax({ 
        url: "/api/notes/" + noteToDelete,
        method: "DELETE"
    }).then(function(){ 
        bootbox.hideAll(); 
    }); 
}
}); 
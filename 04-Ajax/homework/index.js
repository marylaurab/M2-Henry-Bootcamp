/*$('#boton').click(function(){

   let listaNombres=[];
    for(let i=0; i<amigos.length; i++) {
        let individuo = amigos[i];
        listaNombres.push(individuo.name);
    }; $.get('http://localhost:5000/amigos', listaNombres)
    ------------------------------------------------------
   let img = document.body.getElementsByTagName('img');
   -------------------------------------------------
   const lista = document.querySelector('#lista');
   const nombres = document.createElement('li');
   nombres.innerText = amigos.name;
   lista.append(nombres);
   ^ se usa appendChild ya que no estoy usando queryselector, y ademas,
   todo esto iba dentro de un for para ir creando cada cosa por cada posicion del array;

})*/


//MOSTRANDO LISTA DE AMIGOS BOTON 1:
let showingFriends = function() {
    $('#lista').empty();
    $('img').remove();
    $.get('http://localhost:5000/amigos', function(friends){
        friends.forEach(i => {
            $('#lista').append(`<li>${i.name} X </li>`);
        })
    });
};
/*$('#boton').click(showingFriends()) ERROR CUANDO INVOCO LA FUNCION AL MOMENTO DE PASARLA COMO PARAMETRO,
PORQUE QUIERO QUE SE INVOQUE CUANDO HAYA UN CLICK, NO EN CUALQUIER MOMENTO*/
$('#boton').click(showingFriends);

//FUNCION separada FINAL BUSCANDO AMIGO PUNTUAL BOTON 2
let buscandoAmigo = function() {
    $('#amigo').empty();
    let id= $('#input').val();
    $.get(`http://localhost:5000/amigos/${id}`, function(amigo) {
        $('#amigo').text(amigo.name);
    });
};
$('#search').click(buscandoAmigo);
 
//SINO, SE ME OCURRIRIA HACERLO COMO: NO ESTA BIEN EL SEGUNDO PARAMETRO;
$('#search').click(function(){
    $('#amigo').empty();
    $.get('http://localhost:5000/amigos', $('#input').val(), function(amigo) {
        $('#amigo').text(amigo.name);
    });
});

//FUNCION unida FINAL BUSCANDO AMIGO PUNTUAL BOTON 2:
$('#search').click(function() {
    $('#amigo').empty();
    let id= $('#input').val();
    if(id) {
    $.get(`http://localhost:5000/amigos/${id}`, function(amigo){
        $('#amigo').text(amigo.name);
        $('#input').val('');
    })} else {
        $('#amigo').text('Por favor ingresar un ID')
    };
});
//Error: No existe un metodo abreviado para delete como get y post.
$('#delete').click(function() {
    let idDelete = $('#inputDelete').val();
    $.delete(`http://localhost:5000/amigos/${idDelete}`, function(amigo) {
        $('#success').text('Su amigo se ha borrado con exito');
    });
});

//FUNCION FINAL DELETE AMIGO PUNTUAL BOTON 3:
let deletingFriend= function() {
    let idDelete= $('#inputDelete').val();
    if(idDelete) {
    $.ajax({url: `http://localhost:5000/amigos/${idDelete}`,
type: 'DELETE',
success: function() {
    $('#success').text('Su amigo fue eliminado con exito');
    $('inputDelete').val('');
    showingFriends();
} });
    } else {
        $('#success').text('Por favor ingrese un ID');
    };
};

$('#delete').click(deletingFriend);



(function IIFE(window, document, undefined) {



    // bridge.subscribe("vtgetdata", getAttrs); se suscribe un msj dentro de este elemento queda almacenada la info obtenidad
    //raiseEvent --> evento o funcion que obtine todos los datos
    'use strict';
    var bridge = window.VTWidgetBridge.Bridge;

    window.addEventListener('load', function(){
        setTimeout(init, 1000);
    });

    function init (){
        // bridge.subscribe("vtgetdata",getAttrs);

        //getAttrs(); //solo habilitar pruebas locales en el navegador, comentar cuando se sube

        // getProcessData();
    }
    // lib cropper

    let cropper = null;

    $('#input-file').on('change', () => {
        let image = document.getElementById('img-cropper')
        let input = document.getElementById('input-file')

        let archivos = input.files
        let extensiones = input.value.substring(input.value.lastIndexOf('.'), input.value.lenght)
        

        if(!archivos || !archivos.length){        
            image.src = "";
            input.value = "";
            
        } else if(input.getAttribute('accept').split(',').indexOf(extensiones) < 0){
            alert('Debes seleccionar una imagen')
            input.value = "";

        } else {
            let imagenUrl = URL.createObjectURL(archivos[0])
            image.src = imagenUrl

            cropper = new Cropper(image, {
                aspectRatio: 1/2, // es la proporción en la que queremos que recorte en este caso 1:1
                preview: '.img-sample', // contenedor donde se va a ir viendo en tiempo real la imagen cortada
                zoomable: true, //Para que no haga zoom 
                viewMode: 1, //Para que no estire la imagen al contenedor
                responsive: false, //Para que no reacomode con zoom la imagen al contenedor
                dragMode: 'move', //Para que al arrastrar no haga nada
                cropBoxResizable:false,
                minContainerWidth:0,
                minContainerHeight:0,
                minCanvasWidth:650,
                minCanvasHeight:1050,
                minCropBoxWidth:100,
                minCropBoxHeight:1030,
                ready(){ // metodo cuando cropper ya este activo, le ponemos el alto y el ancho del contenedor de cropper al 100%
                    document.querySelector('.cropper-container').style.width = '100%'
                    document.querySelector('.cropper-container').style.height = '100%'
                }
            })

            $('.modal').addClass('active')
            $('.modal-content').addClass('active')

            $('.modal').removeClass('remove')
            $('.modal-content').removeClass('remove')
        }
    })

    $('#close').on('click', () => {
        let image = document.getElementById('img-cropper')
        let input = document.getElementById('input-file')

        image.src = "";
        input.value = "";

        cropper.destroy()

        $('.modal').addClass('remove')
        $('.modal-content').addClass('remove')

        $('.modal').removeClass('active')
        $('.modal-content').removeClass('active')
    })

    $('#cut').on('click', () => {
        let crop_image = document.getElementById('crop-image')
        let canva = cropper.getCroppedCanvas()
        let image = document.getElementById('img-cropper')
        let input = document.getElementById('input-file')
        let img64 = canva.toDataURL("image/jpeg");
        let img64Split = img64.slice(23)

        canva.toBlob(function(blob){
            let url_cut = URL.createObjectURL(blob)
            crop_image.src = url_cut;
        })

        image.src = "";
        input.value = "";

        cropper.destroy()

        $('.modal').addClass('remove')
        $('.modal-content').addClass('remove')

        $('.modal').removeClass('active')
        $('.modal-content').removeClass('active')
    })

    $('#input-file').on('click', () => {
        
        bridge.subscribe("vtgetdata", getAttrs);
        bridge.raiseEvent("p_get_img");
    })

    function getAttrs(name, attrs) {
        
        var imgToCut  =   attrs.imgUp;
    }

})(window, document);
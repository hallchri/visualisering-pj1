var iData;
function getImage() {
var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        window.onload = function () {
           
            var img = document.getElementById('input'); // skapar en htmlimage variabel
            canvas.height = img.height; // set canvas to image height
            context.drawImage(img,0,0); // rita bilden till vår canvas "context"
            var imageData = context.getImageData(0,0, img.width, img.height).data;
            //console.log(imageData);

            // reagera på uppladdad fil
            document.getElementById('inFile').addEventListener('change', handleFile);
            iData = imageData;
            //console.log(iData);
            drawChart();
        };
    

        function handleFile(event) {
            var reader = new FileReader; // object with sole purspose of reading data from Blob
            reader.readAsDataURL(event.target.files[0]); // read binary data encode as base64
            
            reader.onload = function (event) { // Skicka vidare händelse
                // På rad 25? skapas en htmlimage (när vi tar den från DOM)
                // Här finns det ingen image (det är ju en input file)
                // så vi får köra konstruktorn manuellt
                var img = new Image; // skapa en <img> tag i js
                img.src = event.target.result; // lägg till src till htmlelement (img taggen)
                //console.log(img);
                img.onload = function () {
                    canvas.height = img.height; // set canvas to image height
                    context.drawImage(img,0,0); // rita bilden till vår canvas "context"
                    var imageData = context.getImageData(0,0, img.width, img.height).data;
                    //console.log(imageData);
                    iData = imageData;
                    drawChart();
                }
            }
        }; 
        return iData;
    };
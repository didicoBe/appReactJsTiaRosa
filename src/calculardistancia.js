

class Calculardistancia {
    // var lat1 = 41.3879169;
    // var lon1 = 2.1699187;
    // var lat2 = 40.4167413;
    // var lon2 = -3.7032498;
    
    
    Dist(lat1, lon1, lat2, lon2)
    {
        const rad = function(x) {return x*Math.PI/180;}

        var R     = 6378.137;                  //Raio da Terra no km (WGS84)
        var dLat  = rad( lat2 - lat1 );
        var dLong = rad( lon2 - lon1 );

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;

        return d.toFixed(3);                   //Retorno 3 casas decimais
    }
}

export default Calculardistancia


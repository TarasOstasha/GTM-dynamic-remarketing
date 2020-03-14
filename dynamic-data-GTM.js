<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NJJPLJL');
</script>
<!-- End Google Tag Manager -->
<!-- dynamic remarketing -->
<script>
var pagetype = 'other'
var googleprice = 0;
var googleprodid ='';
var productCategory = $('b a[title]:last-child').text().trim();;
var pathname = window.location.pathname;

if(pathname == "/" || pathname == "/Default.asp" || pathname == "/default.asp"){ /* If home page */
  pagetype = 'home';
}else
if(pathname.indexOf('-s/') > -1){/* If Category Page */
  pagetype = 'category';
}else
if(pathname.indexOf('-p/') > -1){/* If Product Page */
  pagetype = 'product';
  googleprice = jQuery('span[itemprop="price"]').text().replace(/[^0-9.]/g,'');
  googleprodid = window.global_Current_ProductCode;
}else
if(pathname.indexOf('shoppingcart') > -1 || pathname.indexOf('ShoppingCart') > -1){/* If cart Page */
  pagetype = 'cart';
  googleprice = jQuery(".pricecolor.colors_productprice b:first").text().replace(/[^0-9.]/g, '');
  var productIdArray = new Array();
  var cartquantity = $('a .cart-item-name').length; // total items in cart
  for (var i=0; i < cartquantity; i++) { 
        var link = $('a.cart-item-name').eq(i).attr('href');
        var substr = link.split('&'); 
        var pcode = substr[0].split('=');
        googleprodid = pcode[1].replace("%","-"); 
        productIdArray.push(googleprodid);
    }
        googleprodid = productIdArray; 
    } else

if( pathname.indexOf('one-page-checkout') > -1 || pathname.indexOf('onepagecheckout') ) { /* If One Page Checkout*/

  pagetype = 'cart';

  var productIdArray = new Array(); // set product Id in this array
// 1 method
  var productId = jQuery('.v65-onepage-ordersummary-itemcode').text().replace(/[\s.,%]/g, ' ');
  var cut = productId.replace(/                /g, ', ') // 1 step remove
  var cut2 = cut.replace(/         Code, /g,',') // second step remove
  var cut3 = cut2.replace(/ ,/g,'') // third step remove
  var cut4 = cut3.replace(/      /,'') //4 step remove
  productIdArray.push(cut4);
// 2 method
  var totalPrice = jQuery('#TotalsTotalTD').text().replace(/[^0-9.]/g,'');
  var productId = jQuery('.v65-onepage-ordersummary-itemcode').text().replace(/[\s.,%]/g, ' ').trim().split('                ');
  productId.shift();
  var productIdArray = new Array(); // set product Id in this array
  productIdArray.push(productId);

  // set value to data layer
  googleprice = totalPrice;
  googleprodid = productIdArray;

}  
else 
if( pathname.indexOf('OrderFinished') > -1 || pathname.indexOf('orderfinished') > -1 ){/* If confirmation Page */
  pagetype = 'purchase';
  googleprice = Order[2];
  productIdArray = new Array();
  for (var i=0; i < OrderDetails.length; i++) {
    productIdArray.push(OrderDetails[i][2]);
  }
  googleprodid = productIdArray;
};
/* GOOGLE TAG PARAM INITIALIZATION */
 var google_tag_params = {
  ecomm_prodid: googleprodid, // required
  ecomm_pagetype: pagetype, // required
  ecomm_totalvalue: parseFloat(googleprice), // required
  //ecomm_pagetype: 'product', // optional
  ecomm_pcat: productCategory, //optional
};
</script>
 
<!-- METHOD FOR RRODUCT PAGE-->
<script> 
(function () {
    "use strict";
    var pcode = global_Current_ProductCode;
    var pname = $('[itemprop="name"]').text();
    var pcat = $('.vCSS_breadcrumb_td a:last-of-type').text().trim();
    var googleprice = jQuery('span[itemprop="price"]').text().replace(/[^0-9.]/g,'');

    if (pcode) { //only do this gtag if pcode exists (is product page)
        window.google_tag_params = {
            'ecomm_pagetype': 'product',
            'ecomm_prodid': pcode,
            ...(pcat && { 'ecomm_pcat': pcat }), //only include pcat if it is found
            ...(pname && { 'ecomm_pname': pname }), //only include pname if it is found
            ...(googleprice && {'ecomm_totalvalue': googleprice})
        };
    }

})();
</script>

<!-- push value o dataLayer -->
<script>
dataLayer = window.dataLayer || [];
dataLayer.push ({   
 'event':'remarketingTriggered',
 'google_tag_params': window.google_tag_params 
});
</script>
<!-- end of dynamic remarketing -->

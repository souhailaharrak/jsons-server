$(document).ready(function () {
    let fullDataUrl = "http://localhost:3000/produit?_page=1&_limit=10";
        output = "",
        json_list = $('.json-list');

// start function lodaData
    function loadData(ajaxUrl) {
        
        $.ajax({

            url: ajaxUrl,
            method: "Get",
            dataType: "json",

        }).done(function (response) {

            // delete all rows in table
            json_list.find('tbody').empty();

            // create new rows in tbody
            for (let index = 0; index < response.length; index++) {
                const element = response[index];

                // start new tr
                output = `<tr>
                            <td>${element.id}</td> 
                            <td>${element.prix} MAD</td>
                            <td>${element.désignation}</td>
                            <td>${element.length}</td>
                            <td>${element.catégorie}</td>`;
                // start td
                output += `<td class="disponibilité">`;
                    let allDisponibility = element.disponibilité.join(" and ");

                     output += `<span>
                            ${allDisponibility}
                            </span>`;

                output += `</td>`;
                // end td

                // start td
                output += `<td class="fournisseur">
                                <td class="d-block badge badge-pill bg-primary mb-2">
                                    ${element.fournisseur.raison_sociale}
                                </td>

                                <td class="d-block badge badge-pill bg-primary mb-2">
                                    ${element.fournisseur.adresse}
                                </td>
                            </td>`;

                // end td

                output += `</tr>`;
                // end tr

                // append tr to tbody in the table
                json_list.find('tbody').append(output);
            }

          
            
        }).fail(function (error) {
            console.log("error=> " + error)
        })
        
    }
    
    // get all product in load of page
    loadData(fullDataUrl);

    // search box
    $('#searchBox').keyup(function (){
        let search = $(this).val(),
            urlAjax = "http://localhost:3000/produit?q="+search;
        
        loadData(urlAjax);
    });

    // order method
    $('#order-btn').click(function(){
        let sortMethod = $('#sort-method').val(),
            orderValue = $('#order-value').val(),
            orderAjaxUrl="http://localhost:3000/produit?_sort="+sortMethod+"&_order="+orderValue;

        loadData(orderAjaxUrl);
    })

    // pagination 
    $('.page-link').click(function(e){
        
        e.preventDefault();// diabled # in url

        let elementClicked = $(this); // .page-link
            pageValue = elementClicked.text(),
            ajaxPaginationUrl="http://localhost:3000/produit?_page="+pageValue+"&_limit=10";

            // add class active to elementClicked parent
            // remove active class from li siblings
            elementClicked.parent().addClass('active').siblings("li").removeClass('active')

            // remove searchbox
            $('#searchBox').val('');
            
            loadData(ajaxPaginationUrl)
    })
});
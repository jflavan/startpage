(function () {

    $('#webAddress').focus();
    bindEvents();
    //initWeather();

    function bindEvents() {
        $('#webAddress').on('input', function() {
            var url = $('#webAddress').val();
            var formattedUrl = formatUrl(url);

            $("#webAddressForm").attr("action", formattedUrl);
        });

        $(`#webAddress, #googleSearch, #ddgSearch,
            #youtubeSearch`).on('keydown', function(e) { 
            var keyCode = e.keyCode || e.which; 
            
            if (keyCode == 9) { 
                e.preventDefault();
                tabNext();
            } 
        });

        $('#web-tab').click(async function(){
            await sleep(250); //bump down the call stack for fade to finish
            $('#webAddress').focus();
        });

        $('#google-tab').click(async function(){
            await sleep(250); //bump down the call stack for fade to finish
            $('#googleSearch').focus();
        });

        $('#ddg-tab').click(async function(){
            await sleep(250);
            $('#ddgSearch').focus();
        });

        $('#youtube-tab').click(async function(){
            await sleep(250);
            $('#youtubeSearch').focus();
        });
    }

    function initWeather () {
        $.ajax({
            url: "http://metaweather.com/api/location/2486982",
            type: "GET",
            crossDomain: true,
            dataType: "json",
            success: function (response) {
                var resp = JSON.parse(response)
                alert(resp);
            }
        });

        $('#temp').text('96');
    }

    function formatUrl(url) {
        //regular expression for URL
        var pattern = /^(http|https)?:\/\/[a-zA-Z0-9-\.]+\.[a-z]{2,4}/;

        if(!pattern.test(url)){
            formattedUrl = 'https://' + url;
        }

        return formattedUrl;
    }

    async function tabNext() {
        var tabs = $('.nav-link');
        var tabCount = tabs.length;
        var currentTab = $('.nav-link.active')[0].id;
        var currentId = 0;
        var nextId = 0;
        var nextTab;

        $.each(tabs, function(id, data) {
            if(currentTab === data.id) {
                currentId = id;

                if(currentId === (tabCount -1)) {
                    nextId = 0;
                } else if (currentId === id && currentId !== tabCount) {
                    nextId = currentId + 1;
                }
            }
        });

        nextTab = tabs[nextId];
        await sleep(250);
        $(nextTab).click();
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
})();
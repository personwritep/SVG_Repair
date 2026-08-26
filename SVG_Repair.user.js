// ==UserScript==
// @name        SVG Repair ⭐
// @namespace        http://tampermonkey.net/
// @version        0.8
// @description        「svg画像」のリンクアイコンを自動でテキストに置換え
// @author        Ameba Blog User
// @match        https://blog.ameba.jp/ucs/entry/srventryinsertinput.do*
// @match        https://blog.ameba.jp/ucs/entry/srventryupdateinput.do*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=ameba.jp
// @grant        none
// @updateURL        https://github.com/personwritep/SVG_Repair/raw/main/SVG_Repair.user.js
// @downloadURL        https://github.com/personwritep/SVG_Repair/raw/main/SVG_Repair.user.js
// ==/UserScript==


let retry=0;
let interval=setInterval(wait_target, 100);
function wait_target(){
    retry++;
    if(retry>10){
        clearInterval(interval); }
    let target=document.querySelector('#cke_1_contents');
    if(target){
        clearInterval(interval);
        wh(); }}



function wh(){
    main();

    let target=document.querySelector('#cke_1_contents');
    let monitor=new MutationObserver( main );
    monitor.observe(target, {childList: true}); }



function main(){
    sessionStorage.setItem("jslord_4", "1"); // 📛

    let editor_iframe;
    let iframe_doc;

    editor_iframe=document.querySelector('.cke_wysiwyg_frame');
    if(editor_iframe){
        iframe_doc=editor_iframe.contentWindow.document;
        if(iframe_doc){
            let target=iframe_doc.body;
            if(target){
                let monitor1=new MutationObserver( in_frame );
                monitor1.observe(target, {childList: true, subtree: true}); }

            in_frame();


            function in_frame(){

                // リンクカードのsvg画像の置換え 🔵
                let svg_icon=iframe_doc.querySelectorAll('.ogpCard_link svg');
                for(let k=0; k<svg_icon.length; k++){
                    let parent_span=svg_icon[k].closest('span');
                    parent_span.innerHTML='∽';

                    let parent_color='';
                    if(parent_span.style.fill && parent_span.style.fill !='currentColor'){
                        parent_color=parent_span.style.fill; }
                    let css=
                        'height: 14px; width: 16px; font: bold 14px/17px Meiryo; '+
                        'transform: rotate(135deg);';
                    if(parent_color !=''){
                        css +=' color: '+ parent_color; }
                    parent_span.setAttribute('style', css); }



                // Blockquoteのsvg画像の置換え 🔵
                let svg_quote=iframe_doc.querySelectorAll('blockquote svg');
                for(let k=0; k<svg_quote.length; k++){

                    let bq_set=0; // デザイン種
                    for(let i=0; i<10; i++){
                        if(svg_quote[k].classList.contains('m'+i)){
                            bq_set=i;
                            break; }}

                    let new_quote='<i class="bqm m'+ bq_set +'" style="position: absolute; ';
                    if(bq_set<5){
                        let quote_color=svg_quote[k].style.fill;
                        new_quote+=
                            'top: -8px; left: 10px; font-size: 48px; '+
                            'background: transparent; color: '+quote_color+';">❝</i>'; }
                    else if(bq_set==5){
                        new_quote+=
                            'top: -8px; left: 10px; font-size: 0; '+
                            'background: transparent;"> </i>'; }
                    else if(bq_set>5){
                        new_quote+=
                            'top: -4px; left: -23px; font-size: 40px; '+
                            'background: transparent; color: #fff; '+
                            'filter: drop-shadow(1px 1px 1px black);">❝</i>'; }

                    svg_quote[k].insertAdjacentHTML('afterend', new_quote);
                    svg_quote[k].remove(); }



                // リンクカード以外のsvg画像のハイライト 🔵
                let svg_img=iframe_doc.querySelectorAll('svg');
                if(svg_img.length>0){
                    let svg_style=
                        '<style class="svg_style">svg { outline: 2px solid red; }</style>';

                    if(!iframe_doc.querySelector('.svg_style')){
                        iframe_doc.documentElement.insertAdjacentHTML('beforeend', svg_style); }}

                // svg画像数をパネルに表示 🔵
                count_svg();

                function count_svg(){
                    let svg_img=iframe_doc.querySelectorAll('svg');

                    if(svg_img.length>0){
                        let disp=
                            '<div class="svg_count" '+
                            'style="position: fixed; top: 60px; left: 20px; font: 16px Meiryo; color: #fff; '+
                            'padding: 5px 15px 3px; border: 1px solid #fff; background: red; z-index: 30; ">'+
                            'SVG画像：<b>'+ svg_img.length +'</b></div>';
                        if(document.querySelector('.svg_count')){
                            document.querySelector('.svg_count').remove(); }
                        document.body.insertAdjacentHTML('beforeend', disp); }

                    if(svg_img.length==0){
                        if(document.querySelector('.svg_count')){
                            document.querySelector('.svg_count').remove(); }}} // count_svg()

            } // in_frame()

        }}

} // main()

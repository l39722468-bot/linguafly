const USPAPI_BOOTSTRAP = `(function(){if(typeof window==='undefined'){return;}if(typeof window.__uspapi!=='function'){window.__uspapi=function(command,version,callback){if(command==='ping'){if(typeof callback==='function'){callback({cmpLoaded:false,cmpStatus:'stub',apiVersion:version||1},true);}return;}if(command==='getUSPData'){if(typeof callback==='function'){callback({version:1,uspString:'1---'},true);}return;}if(typeof callback==='function'){callback(null,false);}};}function addLocatorFrame(){if(window.frames.__uspapiLocator){return;}if(!document.body){window.setTimeout(addLocatorFrame,0);return;}var iframe=document.createElement('iframe');iframe.style.cssText='display:none;position:absolute;width:1px;height:1px;top:-9999px;';iframe.name='__uspapiLocator';iframe.tabIndex=-1;iframe.setAttribute('title','');iframe.setAttribute('aria-hidden','true');document.body.appendChild(iframe);}addLocatorFrame();})();`;

export default function UspapiLocator() {
  return (
    <script
      id="UspapiLocator"
      dangerouslySetInnerHTML={{
        __html: USPAPI_BOOTSTRAP,
      }}
    />
  );
}

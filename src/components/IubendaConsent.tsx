const IUBENDA_CONFIGURATION =
  'var _iub = _iub || [];\n_iub.csConfiguration = {"siteId":4664129,"cookiePolicyId":98937340,"lang":"es","storage":{"useSiteId":true}};';

/**
 * Snippet nativo de iubenda. El breakout mantiene los cuatro scripts en el
 * HTML inicial y en este orden, antes de cualquier etiqueta que pueda bloquear.
 */
export default function IubendaConsent() {
  return (
    <script
      id="iubenda-configuration"
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `${IUBENDA_CONFIGURATION}</script><script type="text/javascript" src="https://cs.iubenda.com/autoblocking/4664129.js"></script><script type="text/javascript" src="//cdn.iubenda.com/cs/gpp/stub.js"></script><script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charset="UTF-8" async=""></script>`,
      }}
    />
  );
}

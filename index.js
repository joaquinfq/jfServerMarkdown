const jfServerHandlerGet = require('jf-server/src/handler/Get');
const remark             = require('remark');
const html               = require('remark-html');
const highlight          = require('remark-highlight.js');
const slug               = require('remark-slug');
const style              = require('path').join(__dirname, 'style.css');
/**
 * Clase para procesar los archivos `.md` en el servidor.
 *
 * @namespace jf.server
 * @class     jf.server.Markdown
 * @extends   jf.server.handler.Base
 */
module.exports = class jfServerMarkdown extends jfServerHandlerGet
{
    /**
     * Extensiones que gestiona la clase.
     *
     * @return {string[]} Listado de extensiones.
     */
    static get extensions()
    {
        return ['.md'];
    }

    /**
     * @override
     */
    async buildFile(filename)
    {
        await super.buildFile(filename);
        const _page    = this.page;
        const _content = _page.content;
        if (_content)
        {
            _page.css.push(style);
            _page.content      = null;
            _page.options.body = await this.buildHtml(_content, filename);
            this._buildTypeFromFile(filename + '.html');
        }
    }

    /**
     * Genera HTML a partir de código markdown.
     *
     * @param {string} markdown Texto en formato markdown.
     * @param {string} filename Ruta del archivo de donde se ha obtenido el markdown.
     *
     * @return {Promise<string>} Código HTML generado.
     */
    async buildHtml(markdown, filename = '')
    {
        return String(
            await remark()
                .use(highlight)
                .use(slug)
                .use(html)
                .process(markdown)
        );
    }
};

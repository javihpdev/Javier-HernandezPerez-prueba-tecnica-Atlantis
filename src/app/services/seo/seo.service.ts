import {inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2, DOCUMENT} from '@angular/core';
import {TranslateService as NgxTranslateService} from "@ngx-translate/core";
import {TranslateService} from "../translate/translate.service";
import {NavigationEnd, Router} from "@angular/router";
import {isPlatformServer} from "@angular/common";
import {Meta, Title} from "@angular/platform-browser";
import {locales} from "@locales";

/**
 * Service for managing SEO metadata and tags.
 */
@Injectable({
  providedIn: 'root'
})
export class SeoService {

  private _ngxTranslateService: NgxTranslateService = inject(NgxTranslateService);
  private _translateService: TranslateService = inject(TranslateService);
  private _router: Router = inject(Router);
  private _platformId: Object = inject(PLATFORM_ID);
  private _document: Document = inject(DOCUMENT);
  private _meta: Meta = inject(Meta);
  private _title: Title = inject(Title);
  private _rendererFactory: RendererFactory2 = inject(RendererFactory2);
  private _renderer2: Renderer2 = this._rendererFactory.createRenderer(null, null);
  private _addAlternate = false; // True en caso de necesitar alternates

  /**
   * Loads translations and performs SEO operations
   *
   * @return {Promise<boolean>} - A promise that resolves to `true` when loading is complete
   */
   public load(): Promise<boolean> {
    return new Promise(resolve => {
      this._ngxTranslateService.get('initKey').subscribe(() => {
        this._translateService.addTranslation('metas').then(() => {
          this._document.documentElement.lang = this._ngxTranslateService.currentLang;
          this._launchSeoMethods();
          resolve(true);
        });
      });

      this._router.events.subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          this._launchSeoMethods();
        }
      });
    });
  }


  /**
   * Launches the SEO methods to set meta tags, canonical and alternate links,
   * robots directives, Open Graph (OG) tags for title, description, site name, locale,
   * URL, and image.
   *
   * @private
   *
   * @returns {void}
   */
  private _launchSeoMethods(): void {
    const url = this._router.url.slice(4).split('/').join('/');
    this._setMetaTitleAndDescription();
    this._setCanonicalAndAlternate(url);
    this._setRobots(url);
    this._setOgType();
    this._setOgSiteName();
    this._setOgLocale();
    this._setOgUrl();
    this._setOgImage(url);
  }

  /**
   * Sets the og:locale property in the meta tags.
   *
   * @private
   * @returns {void}
   */
  private _setOgLocale(): void  {
    this._meta.updateTag({
      property: 'og:locale',
      content: this._ngxTranslateService.currentLang
    });
  }

  /**
   * Sets the `og:url` meta tag.
   *
   * @private
   * @returns {void}
   */
  private _setOgUrl(): void  {
    this._meta.updateTag({
      property: 'og:url',
      content: this._host + '/' + this._ngxTranslateService.currentLang + '/' + this._router.url.slice(4),
    });
  }

  /**
   * Sets the Open Graph image tag for the current page.
   *
   * @param {string} url - The URL or key to lookup in the translation service.
   *
   * @return {void}
   */
  private _setOgImage(url: string): void  {
    const og_image =  this._host + '/assets/icons/logo-og.jpg';
    if(url.length > 0 && this._translateService.hasTranslation('metas.' + url + '.og:image')) {
      this._meta.updateTag({
        property: 'og:image',
        content: this._host + this._ngxTranslateService.instant('metas.' + url + '.og:image')
      });
    }else {
      this._meta.updateTag({
        property: 'og:image',
        content: og_image
      });
    }
  }


  /**
   * Sets the og:type meta tag to 'website'.
   *
   * @private
   * @returns {void}
   */
  private _setOgType(): void  {
    this._meta.updateTag({
      property: 'og:type',
      content: 'website'
    });
  }
  /**
   * Sets the og:site_name meta tag.
   *
   * @return {void}
   */
  private _setOgSiteName(): void  {
    this._meta.updateTag({
      property: 'og:site_name',
      content: ''
    });
  }

  /**
   * Sets the robots meta tag for the given URL.
   * @param {string} url - The URL for which the robots meta tag should be set.
   * @return {void} - This method does not return anything.
   */
  private _setRobots(url: string): void  {
    let meta = this._renderer2.createElement('meta');
    meta.name = 'robots';
    if(this._ngxTranslateService.currentLang == 'es'){
      this._removeElement('robot');
      meta.id = 'robot'
      let key = 'metas.' + url + '.robots'
      if(url.length > 0 && this._translateService.hasTranslation(key)){
        meta.content = this._ngxTranslateService.instant(key);
        this._renderer2.appendChild(this._document.head, meta);
      }
    }else{
      meta.content = 'noindex';
      this._renderer2.appendChild(this._document.head, meta);
    }

  }

  /**
   * Adds title and meta tags based on the given key.
   * @param {string} key - The key used to retrieve the title and description from translation service.
   * @returns {void}
   */
  private _addTitle(key: string): void  {
    this._title.setTitle(this._ngxTranslateService.instant(key + '.title'));
    this._meta.updateTag({
      name: 'description',
      content: this._ngxTranslateService.instant(key + '.description')
    });
  }

  /**
   * Sets the meta title and description based on the current URL.
   * It retrieves the URL from the router and uses it to construct the key for translation.
   * If a translation is found for the key followed by '.title', it adds the title to the meta tags.
   * If no translation is found for the key followed by '.title', it checks for translations
   * for the URL without the last segment, until a translation with parameters is found,
   * and adds the title to the meta tags based on this translation.
   *
   * @access private
   * @returns {void}
   */
  private _setMetaTitleAndDescription(): void  {
    let url = this._router.url.slice(4).split('/').join('/');
    let key = url.length > 0 ? 'metas.' + url : 'metas.home';
    if(this._translateService.hasTranslation(key + '.title')){
      this._addTitle(key);
    }else{
      let routerArray = this._router.url.slice(4).split('/');
      while (routerArray.length > 0){
        url = routerArray.join('/');
        key = 'metas.' + url;
        if(this._translateService.hasTranslation(key + '.title') && this._translateService.hasTranslation(key + '.hasParams')){
          this._addTitle(key);
          break;
        }
        routerArray = routerArray.slice(0, routerArray.length-1)
      }
    }
  }

  /**
   * Appends a canonical link element to the head of the document.
   *
   * @param {string} href - The href attribute value for the canonical link.
   * @param {string} locale - The locale of the canonical link.
   * @returns {void}
   */
  private _appendCanonical(href: string, locale: string): void  {
    const link = this._renderer2.createElement('link');
    link.id = 'canonical-' + locale;
    link.rel = 'canonical'
    link.href = href;
    this._renderer2.appendChild(this._document.head, link);
  }

  /**
   * Appends an alternate link to the document head.
   *
   * @param {string} href - The URL of the alternate link.
   * @param {string} locale - The locale of the alternate link.
   * @return {void}
   */
  private _appendAlternate(href: string, locale: string): void {
    const link = this._renderer2.createElement('link');
    link.id = 'alternate-' + locale;
    link.rel = 'alternate'
    link.hreflang = locale
    link.href = href;
    this._renderer2.appendChild(this._document.head, link);
  }

  /**
   * Removes an element from the DOM tree based on its ID.
   * @param {string} elementId - The ID of the element to be removed.
   * @return {void}
   */
  private _removeElement(elementId: string): void  {
    const element = this._document.getElementById(elementId);
    if (element) {
      element.remove();
    }
  }



  /**
   * Sets the canonical and alternate URLs for the given URL.
   *
   * @param {string} url - The URL to set the canonical and alternate URLs for.
   *
   * @return {void}
   */
  private _setCanonicalAndAlternate(url: string): void {

    this._removeElement('canonical-' + this._ngxTranslateService.currentLang);
    let href =  this._host + '/' + this._ngxTranslateService.currentLang + '/';
    if(url.length > 0){
      href += url;
    }
    this._appendCanonical(href, this._ngxTranslateService.currentLang);
    if(this._addAlternate){
      locales.filter(_locale => _locale != this._ngxTranslateService.currentLang).forEach(locale => {
        this._removeElement('alternate-' + locale);
        href =  this._host + '/' + locale + '/';
        if(url.length > 0){
          href += url;
        }
        this._appendAlternate(href, locale);
      })
    }
  }


  /**
   * Private method that returns the host value.
   *
   * @returns {string} The host value.
   */
  private get _host() : string{
    let host = ''; // Hay que configurarlo en caso de ssr
    if (!isPlatformServer(this._platformId)) {
      host = this._document.location.origin
    }
    return host;
  }

}

export default class Sharer {
  constructor(el) {
    this.el = el;
    this.options = el.dataset;
    this.network = this.getValue('network');
    this.setSharer(this.network)
  }

  getValue(attr) {
    const val = this.el.getAttribute('data-' + attr);
    return (val === undefined || val === null) ? false : val;
  }

  setSharer(network) {
    const sharer = this.getValue('network').toLocaleLowerCase();
    const sharers = {
      facebook: {
        shareUrl: 'https://www.facebook.com/sharer/sharer.php',
        params: {u: this.getValue('url')}
      },
      googleplus: {
        shareUrl: 'https://plus.google.com/share',
        params: {url: this.getValue('url')}
      },
      twitter: {
        shareUrl: 'https://twitter.com/intent/tweet/',
        params: {
          text: this.getValue('title'),
          url: this.getValue('url'),
          hashtags: this.getValue('hashtags'),
          via: this.getValue('via')
        }
      },
      whatsapp: {
        shareUrl: 'whatsapp://send',
        params: {
          text: this.getValue('title') + ' ' + this.getValue('url')
        },
        isLink: true
      }
    };
    const s = sharers[sharer]

    if (s) {
      s.with = this.getValue('width');
      s.height = this.getValue('height');
    }
    return s !== undefined ? this.share(s) : false;
  }

  share(sharer) {
    const p = sharer.params || {};
    const keys = Object.keys(p);
    let str = keys.length > 0 ? '?' : '';
    for (let i = 0; i < keys.length; i++) {
      if (str !== '?') {
        str += '&';
      }
      if (p[keys[i]]) {
        str += keys[i] + '=' + encodeURIComponent(p[keys[i]]);
      }
    }
    sharer.shareUrl += str;

    if (!sharer.isLink) {
      let popWidth = sharer.width || 600,
        popHeight = sharer.height || 480,
        left = window.innerWidth / 2 - popWidth / 2 + window.screenX,
        top = window.innerHeight / 2 - popHeight / 2 + window.screenY,
        popParams = 'scrollbars=no, width=' + popWidth + ', height=' + popHeight + ', top=' + top + ', left=' + left,
        newWindow = window.open(sharer.shareUrl, '', popParams);

      if (window.focus) {
         newWindow.focus()
      }
    } else {
      window.location.href = sharer.shareUrl
    }
  }
}

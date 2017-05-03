const Promise = require('bluebird');
const TorrentProvider = require('../torrent-provider');

class Limetorrents extends TorrentProvider {
    _getScrapeDatas() {
        return {
            name: 'Limetorrents',
            baseUrl: 'https://www.limetorrents.cc',
            searchUrl: '/search/{cat}/{query}/',
            categories: {
                'All': ''
            },
            defaultCategory: 'All',
            resultsPerPageCount: 25,
            itemsSelector: 'div#content > table.table2 > tbody > tr[bgcolor]',
            itemSelectors: [{
                title: 'td:nth-child(1) div.tt-name > a:nth-child(2)',
                seeds: 'td:nth-child(4) | int',
                peers: 'td:nth-child(5) | int',
                size: 'td:nth-child(3)',
                desc: 'td:nth-child(1) div.tt-name > a:nth-child(1)@href'
            }],
            paginateSelector: '#next@href',
            torrentDetailsSelector: 'div#content@html'
        };
    }

    _downloadTorrent(torrent) {
        return Promise.fromCallback(this._x(torrent.desc)).then(url => {
            return super._downloadTorrent({ link: url });
        });
    }
}

module.exports = Limetorrents;
const Promise = require('bluebird');
const TorrentProvider = require('../torrent-provider');

class Rarbg extends TorrentProvider {
    _getScrapeDatas() {
        return {
            name: 'Rarbg',
            baseUrl: 'http://rarbg.to',
            searchUrl: '/torrents.php?search={query}&category={cat}',
            categories: {
                'All': 'url:/torrents.php?search={query}',
                'XXX (18+)': 'category%5B%5D=4',
                'Movies/XVID': 'category%5B%5D=14',
                'Movies/XVID/720': 'category%5B%5D=48',
                'Movies/x264': 'category%5B%5D=17',
                'Movies/x264/1080': 'category%5B%5D=44',
                'Movies/x264/720': 'category%5B%5D=45',
                'Movies/x264/3D': 'category%5B%5D=47',
                'Movies/Full BD': 'category%5B%5D=42',
                'Movies/BD Remux': 'category%5B%5D=46',
                'TV Episodes': 'category%5B%5D=18',
                'TV HD Episodes': 'category%5B%5D=41',
                'TV UHD Episodes': 'category%5B%5D=49',
                'Music/MP3': 'category%5B%5D=23',
                'Music/FLAC': 'category%5B%5D=25',
                'Games/PC ISO': 'category%5B%5D=27',
                'Games/PC RIP': 'category%5B%5D=28',
                'Games/PS3': 'category%5B%5D=40',
                'Games/XBOX-360': 'category%5B%5D=32',
                'Software/PC ISO': 'category%5B%5D=33',
                'e-Books': 'category%5B%5D=35'
            },
            defaultCategory: 'All',
            resultsPerPageCount: 25,
            itemsSelector: 'table.lista2t > tbody > tr.lista2',
            itemSelectors: [{
                title: 'td:nth-child(2) a',
                seeds: 'td:nth-child(5) | int',
                peers: 'td:nth-child(6) | int',
                size: 'td:nth-child(4)',
                desc: 'td:nth-child(2) a@href'
            }],
            paginateSelector: 'adiv#pager_links a:contains(»)@href',
            torrentDetailsSelector: 'table.lista-rounded@html'
        };
    }

    _downloadTorrent(torrent) {
        return Promise.fromCallback(this._x(torrent.desc, 'body > table:nth-child(10) > tbody > tr > td:nth-child(2) > div > div > table > tbody > tr:nth-child(2) > td > div > table > tbody > tr:nth-child(1) > td.lista > a:nth-child(2)@href')).then(url => {
            return super._downloadTorrent({ link: url });
        });
    }
}

module.exports = Rarbg;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const dirName = __dirname;
const staticRoot = `${dirName}/sharedemos/static`; // Static Folder Absolute Path
const appsRoot = `${dirName}/sharedemos/apps`; // Apps Folder Absolute Path
const jsRoot = `${staticRoot}/js`; // JavaScript Folder Absolute Path
const libsRoot = `${staticRoot}/libs`; // JavaScript Libraries Absolute Path
const froalaJsRoot = `${libsRoot}/froala/js`; // Froala JavaScript Absolute Path
const froalaPlugins = `${froalaJsRoot}/plugins`; // Froala Plugins Absolute Path

module.exports = {
    entry: {
      'apps/audience/edit': `${jsRoot}/audience/audience.js`,
      'apps/checklist/edit': `${jsRoot}/checklist/edit.js`,
      'apps/checklist/main': `${jsRoot}/checklist/main.js`,
      'apps/faq': `${jsRoot}/faq/faq.js`,
      'apps/journeys/home': `${jsRoot}/apps/journeys/home.js`,
      'apps/journeys/main': `${jsRoot}/apps/journeys/main.js`,
      'apps/pathfinder': `${jsRoot}/pathfinder/pathfinder.js`,
      'apps/pitch/dashboard': `${appsRoot}/pitch/static/js/dashboard/index.js`,
      'apps/pitch/main': `${appsRoot}/pitch/static/js/frontend/index.js`,
      'apps/quiz/edit': `${jsRoot}/quiz/edit.js`,
      'apps/quiz/main': `${jsRoot}/quiz/main.js`,
      'apps/quiz/reports': `${jsRoot}/quiz/reports.js`,
      'apps/sample_exchange/main': `${jsRoot}/apps/sample_exchange/main.js`,
      'apps/sample_exchange/new': `${jsRoot}/apps/sample_exchange/new_sample.js`,

      'author/edit': `${jsRoot}/tenant/edit.js`,

      'dashboard/activity_feed': `${jsRoot}/activity_feed/app.js`,
      'dashboard/homebanner/edit': `${jsRoot}/homepage_banner/edit.js`,
      'dashboard/reports': `${jsRoot}/reports/reports.js`,
      'dashboard/reports-v2': `${jsRoot}/reports/new_reports.js`,
      'dashboard/sitemap': `${jsRoot}/tenant/sitemap.js`,

      'embed_playlist': `${jsRoot}/embed_playlist/embed_playlist.js`,
      'feedback': `${jsRoot}/feedback/feedback.js`,
      'launchpad': `${jsRoot}/launchpad/launchpad.js`,
      'lazyload': `${jsRoot}/lazyload/lazyload.js`,
      'main': `${jsRoot}/tenant/main.js`,
      'pdf_viewer': `${jsRoot}/pdf_viewer/pdf_viewer.js`,

      'templates/avaya/journey': `${jsRoot}/seo/avaya/journey.js`,
      'templates/avaya/main': `${jsRoot}/seo/avaya/main.js`,
      'templates/avaya/search': `${jsRoot}/seo/avaya/search.js`,
      'templates/bmc/search': `${jsRoot}/seo/bmc/search.js`,
      'templates/dell/slider': `${jsRoot}/seo/dell/dataSlider.js`,
      'templates/dell/search': `${jsRoot}/seo/dell/search.js`,
      'templates/designeverest/search': `${jsRoot}/seo/designeverest/search.js`,
      'templates/helpsite/search': `${jsRoot}/seo/helpsite/search.js`,
      'templates/helpsite/main': `${jsRoot}/seo/helpsite/main.js`,
      'templates/purestorage/search': `${jsRoot}/seo/purestorage/search.js`,
      'templates/regalix/search': `${jsRoot}/seo/regalix/search.js`,
      'templates/silverpeak/home': `${jsRoot}/seo/silverpeak/home.js`,
      'templates/silverpeak/search': `${jsRoot}/seo/silverpeak/search.js`,
      'templates/vmware/player': `${jsRoot}/seo/common/player.js`,
      'templates/vmware/search': `${jsRoot}/seo/vmware/search.js`,

      'translations': `${jsRoot}/tenant/translations.js`,
      'services/recommendations': `${appsRoot}/recommendations/static/js/index.js`,
      'services/repository/dashboard': `${jsRoot}/repository_manager/main.js`,
    },
    output: {
      path: `${jsRoot}/build`,
      publicPath: '/static/js/build/',
      filename: '[name].js',
      chunkFilename:'[name].[chunkhash:6].js',
    },
    resolve: {
      modules: [
        `${dirName}/node_modules`
      ],
      alias: {
        // https://github.com/t1m0n/air-datepicker
        'airDatepicker': `${libsRoot}/air-datepicker/js/datepicker.min.js`,
        'airDatepickerEn': `${libsRoot}/air-datepicker/js/lang/datepicker.en.js`,

        // atwho.js
        'atwho': `${libsRoot}/jquery-atwho/jquery.atwho.min.js`,
        'bootstrap': `${libsRoot}/bootstrap/js/bootstrap.min.js`,
        'colpick': `${libsRoot}/colpick/colpick.js`,
        'cookies': `${jsRoot}/helpers/cookies.js`,
        'jcf': `${libsRoot}/jcf/jcf.js`,
        'jcf.scrollable': `${libsRoot}/jcf/jcf.scrollable.js`,

        // jquery utilities
        'jquery.select2': `${libsRoot}/jquery-select2/select2.min.js`,
        'jquery.sudoslider': `${libsRoot}/sudo-slider/jquery.sudoSlider.min.js`,
        'jquery.nestedSortable': `${libsRoot}/nested-sortable/jquery.mjs.nestedSortable.js`,
        'jquery.nicescroll': `${libsRoot}/jquery-nicescroll/jquery.nicescroll.min.js`,
        'jquery.qtip': `${libsRoot}/jquery-qtip/jquery.qtip.min.js`,
        'jquery.ui': `${libsRoot}/jquery-ui/jquery-ui.min.js`,

        // froala editior plugins
        'froalaalign': `${froalaPlugins}/align.min.js`, 
        'froalacharcounter': `${froalaPlugins}/char_counter.min.js`, 
        'froalacodeview': `${froalaPlugins}/code_view.min.js`, 
        'froalacolors': `${froalaPlugins}/colors.min.js`, 
        'froalaeditor': `${froalaJsRoot}/froala_editor.min.js`,
        'froalaembedly': `${froalaJsRoot}/third_party/embedly.min.js`,
        'froalaemoticons': `${froalaPlugins}/emoticons.min.js`, 
        'froalaentities': `${froalaPlugins}/entities.min.js`, 
        'froalafile': `${froalaPlugins}/file.min.js`, 
        'froalafontfamily': `${froalaPlugins}/font_family.min.js`, 
        'froalafontsize': `${froalaPlugins}/font_size.min.js`, 
        'froalaforms': `${froalaPlugins}/forms.min.js`, 
        'froalafullscreen': `${froalaPlugins}/fullscreen.min.js`, 
        'froalahelp': `${froalaPlugins}/help.min.js`, 
        'froalaimage': `${froalaPlugins}/image.min.js`, 
        'froalainlinestyle': `${froalaPlugins}/inline_style.min.js`, 
        'froalalinebreaker': `${froalaPlugins}/line_breaker.min.js`, 
        'froalalink': `${froalaPlugins}/link.min.js`, 
        'froalalists': `${froalaPlugins}/lists.min.js`, 
        'froalaparagraphformat': `${froalaPlugins}/paragraph_format.min.js`,
        'froalaparagraphstyle': `${froalaPlugins}/paragraph_style.min.js`, 
        'froalaprint': `${froalaPlugins}/print.min.js`, 
        'froalaquickinsert': `${froalaPlugins}/quick_insert.min.js`, 
        'froalaquote': `${froalaPlugins}/quote.min.js`, 
        'froalasave': `${froalaPlugins}/save.min.js`, 
        'froalaspecialcharacters': `${froalaPlugins}/special_characters.min.js`, 
        'froalatable': `${froalaPlugins}/table.min.js`, 
        'froalaurl': `${froalaPlugins}/url.min.js`, 
        'froalavideo': `${froalaPlugins}/video.min.js`,
        'froalawordpaste': `${froalaPlugins}/word_paste.min.js`,
        'froalafontawesome': `${froalaJsRoot}/third_party/font_awesome.min.js`,
        'froalalineheight': `${froalaPlugins}/line_height.min.js`,
        'froalauploadfile': `${froalaPlugins}/file.min.js`,

        // https://github.com/mozilla/pdf.js
        'pdf-js': `${dirName}/node_modules/pdfjs-dist/build/pdf.js`,
        'pdf-js-viewer': `${dirName}/node_modules/pdfjs-dist/web/pdf_viewer.js`,
        'pdf-viewer-css': `${dirName}/node_modules/pdfjs-dist/web/pdf_viewer.css`,

        'slick': `${libsRoot}/slick/slick.min.js`,
        'utils': `${jsRoot}/utils.js`,
        'wheelzoom': `${libsRoot}/wheelzoom/wheelzoom.js`
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: ['file-loader'],
        },
        {
          test: /\.handlebars$/,
          loader: "handlebars-loader",
          options: {
            helperDirs: [`${jsRoot}/helpers/handlebars`]
          }
        },
        {
          test: /\.js$/,
          exclude: [/(node_modules)/],
          loader: 'babel-loader',
        }
      ]
    },
    externals: {
      "jquery": "$",
    },
    plugins: [
      new CleanWebpackPlugin(['build'], {
        root: `${jsRoot}/`, // An absolute path for the root.
      }), 
      new CopyWebpackPlugin(
        [
          {
            from: 'node_modules/pdfjs-dist/build/pdf.worker.min.js',
            to: 'pdf.worker.min.js'
          },
          {
            from: 'node_modules/pdfjs-dist/cmaps',
            to: 'pdfjs_cmaps'
          }
        ]
      )
    ],
    node: {
      fs: "empty"
    }
};

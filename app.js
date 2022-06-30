const Koa = require('koa');
const favicon = require('koa-favicon');
const static = require('koa-static');
const Router = require('@koa/router');
const axios = require('axios');

const app = new Koa();

/**
 * router
 */
const router = new Router();
router.get('/iptv/:p*', async (ctx, next) => {
  const p = ctx.path;
  console.log(p);
  if (/^\/iptv\/?$/.test(p)) {
    ctx.body = '代理至: https://iptv-org.github.io/iptv/';
    return next();
  }
  let data;
  try {
    const res = await axios.get(`https://iptv-org.github.io${p}`);
    ctx.set('Content-Type', 'audio/mpegurl');
    data = res.data;
    console.log(data);
  } catch (e) {
    // console.log(e);
    data = 'error';
  }
  ctx.body = data;
  next();
});

/**
 * static
 */
app.use(favicon(__dirname + '/favicon.ico'));
// git clone https://github.com/hououinkami/AppleTV.git
app.use(static(__dirname + '/AppleTV'));
app.use(static(__dirname + '/public'));

/**
 * main
 */
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(9200);



// https://iptv-org.github.io/iptv/languages/zho.m3u

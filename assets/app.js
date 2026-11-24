import { CATEGORIES, WHATSAPP, DELIVERY } from './menu.js?v=202611240843';

const FEES = new Map(DELIVERY.flatMap(g => g.areas));
const feeLabel = v => v === null ? 'taxa a combinar' : v === 0 ? 'entrega grátis' : brlFee(v);
function brlFee(v) { return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const brl = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const BY_ID = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));
const ITEM = {};
for (const c of CATEGORIES) for (const it of c.items || []) ITEM[it.id] = { ...it, cat: c };
const DOCINHOS_MIN = 50;

const ICON = {
  arrow: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M1 6h8"/><path d="M4.5 2.5 8 6l-3.5 3.5"/></svg>',
  minus: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10"/></svg>',
  plus: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M8 3v10"/></svg>',
  info: '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8"/><path d="M10 9v5M10 6.2v.1" stroke-linecap="round"/></svg>',
  wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z"/></svg>',
};

/* ---------------- Meta Pixel (ID 9850103268427591, mantido do site anterior) ---------------- */
function track(ev, params) { try { if (typeof window.fbq === 'function') window.fbq('track', ev, params || {}); } catch {} }
function trackCustom(ev, params) { try { if (typeof window.fbq === 'function') window.fbq('trackCustom', ev, params || {}); } catch {} }

/* Pixel em todos os botões e links: evento "Clique" com o nome do botão e a seção */
const SECTION_NAMES = { topo: 'Menu', 'hero-title': 'Topo', cardapio: 'Cardápio', bolos: 'Bolos', atelie: 'Ateliê', 'como-pedir': 'Como pedir', 'menu-sheet': 'Folha do cardápio', 'bag-sheet': 'Sacola' };
function sectionOf(el) {
  if (el.closest('[data-gate]')) return 'Entrada';
  if (el.closest('.footer')) return 'Rodapé';
  if (el.closest('.jcode')) return 'Jcode Cariri';
  if (el.closest('.fab')) return 'Botão flutuante';
  if (el.closest('.close')) return 'Fechamento';
  if (el.closest('.bagbar')) return 'Barra da sacola';
  if (el.closest('.hero')) return 'Topo';
  const s = el.closest('[id]'); return (s && SECTION_NAMES[s.id]) || (s && s.id) || 'Página';
}
document.addEventListener('click', e => {
  const el = e.target.closest('a, button, label.size, .seg label');
  if (!el) return;
  let label = (el.getAttribute('aria-label') || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80);
  const itemId = el.dataset.inc || el.dataset.dec;
  if (itemId && ITEM[itemId]) label = `${label} · ${ITEM[itemId].name}`;
  const href = el.getAttribute('href') || '';
  trackCustom('Clique', { botao: label, secao: sectionOf(el), destino: href.split('?')[0] || undefined });
  if (/wa\.me/.test(href)) track('Contact', { content_name: label, content_category: sectionOf(el) });
}, true);

/* ---------------- state ---------------- */
const KEY = 'cariri-sacola-v1';
let state = { qty: {}, cakes: [] };
try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s && typeof s === 'object') state = { qty: s.qty || {}, cakes: s.cakes || [] }; } catch {}
for (const id of Object.keys(state.qty)) if (!ITEM[id] || !(state.qty[id] > 0)) delete state.qty[id];
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} };

function totals() {
  let units = 0, sum = 0, docinhos = 0, lines = 0;
  for (const [id, q] of Object.entries(state.qty)) {
    const it = ITEM[id]; if (!it || !q) continue;
    units += q; sum += q * it.price; lines++;
    if (it.cat.group === 'docinhos') docinhos += q;
  }
  for (const c of state.cakes) { sum += c.price; lines++; }
  return { units, sum, docinhos, lines, cakes: state.cakes.length };
}
function catCount(cat) {
  if (cat.cake) return state.cakes.length;
  return cat.items.reduce((n, it) => n + (state.qty[it.id] || 0), 0);
}

function setQty(id, q) {
  const it = ITEM[id];
  if (q <= 0) delete state.qty[id];
  else state.qty[id] = Math.max(it.cat.min, q);
  save(); refresh();
}

/* ---------------- tray ---------------- */
function renderTray() {
  $('[data-tray]').innerHTML = CATEGORIES.map(c => {
    const n = catCount(c);
    const from = c.cake ? `a partir de <b>${brl(c.from).replace(',00', '')}</b>` : `a partir de <b>${brl(c.from)}</b>`;
    return `<li><button class="tile" type="button" data-open-cat="${c.id}" aria-label="${esc(c.title)}, ${c.cake ? 'a partir de ' + brl(c.from) : 'a partir de ' + brl(c.from) + ' a unidade'}${n ? `, ${n} na sacola` : ''}">
      <span class="seal"><img src="${c.tile}" alt="" width="480" height="480" loading="lazy"></span>
      <span><span class="tile__name">${esc(c.short)}${n ? `<span class="tile__badge">${n}</span>` : ''}</span><span class="tile__from">${from}</span></span>
      <span class="tile__go" aria-hidden="true">${ICON.arrow}</span>
    </button></li>`;
  }).join('');
}

/* ---------------- menu sheet ---------------- */
const sheet = $('#menu-sheet');
const bagSheet = $('#bag-sheet');
let current = null;
let focusLine = null;

function renderChips() {
  $('[data-chips]').innerHTML = CATEGORIES.map(c => `<button class="chip" type="button" data-chip="${c.id}" aria-current="${c.id === current ? 'true' : 'false'}">${esc(c.short)}</button>`).join('');
  const row = $('[data-chips]');
  const on = $(`[data-chip="${current}"]`);
  if (!on) return;
  if (on === row.firstElementChild) row.scrollLeft = 0;
  else on.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
}

function itemRow(it) {
  const q = state.qty[it.id] || 0;
  const cat = it.cat;
  const ctrl = q
    ? `<div class="stepper" role="group" aria-label="Quantidade de ${esc(it.name)}">
         <button type="button" data-dec="${it.id}" aria-label="Tirar ${cat.step}">${ICON.minus}</button>
         <output aria-live="polite">${q}</output>
         <button type="button" data-inc="${it.id}" aria-label="Mais ${cat.step}">${ICON.plus}</button>
       </div>`
    : `<button class="add-btn" type="button" data-inc="${it.id}">Adicionar ${cat.min}</button>`;
  return `<li class="item${it.img ? '' : ' item--noimg'}${q ? ' is-in' : ''}">
    ${it.img ? `<span class="seal"><img src="${it.img}" alt="${esc(it.name)}" width="240" height="240" loading="lazy"></span>` : ''}
    <div><div class="item__name">${esc(it.name)}</div><div class="item__price">${cat.fromPrice ? 'a partir de ' : ''}<b>${brl(it.price)}</b> a unidade${q ? ` · ${brl(q * it.price)}` : ''}</div>${cat.fromPrice ? '<div class="item__note">Pode ter adicional conforme a arte e o carimbo</div>' : ''}</div>
    ${ctrl}
  </li>`;
}

function cakeLine(line) {
  const name = `cake-${line.id}`;
  return `<form class="cake-line${focusLine === line.id ? ' is-focus' : ''}" id="line-${line.id}" data-cake-form="${line.id}">
    <img src="${line.img}" alt="${esc(line.name)}" width="480" height="480" loading="lazy">
    <div class="cake-line__body">
      <h3>${esc(line.name)}</h3>
      <fieldset><legend>Tamanho</legend><div class="sizes">
        ${line.sizes.map((s, i) => `<label class="size"><span><input type="radio" name="${name}-size" value="${s.id}" ${i === 0 ? 'checked' : ''}>${esc(s.label)}<small>${s.flavors} sabor${s.flavors > 1 ? 'es' : ''}</small></span><b>${brl(s.price)}</b></label>`).join('')}
      </div></fieldset>
      <div class="grid2">
        <div class="field"><label for="${name}-f1">Sabor</label><select id="${name}-f1" name="f1">${line.flavors.map(f => `<option>${esc(f)}</option>`).join('')}</select></div>
        <div class="field" data-f2><label for="${name}-f2">Segundo sabor</label><select id="${name}-f2" name="f2"><option value="">Só um sabor</option>${line.flavors.map(f => `<option>${esc(f)}</option>`).join('')}</select></div>
      </div>
      <button class="btn btn--red" type="submit">Adicionar à sacola</button>
    </div>
  </form>`;
}

function renderSheet() {
  const cat = BY_ID[current];
  if (!cat) return;
  $('[data-sheet-title]').textContent = cat.title;
  renderChips();
  const body = $('[data-sheet-body]');
  let html = `<div class="cat-intro"><p class="cat-rule">${ICON.info}<span>${esc(cat.rule)}</span></p>`;
  if (cat.gallery) html += `<div class="cat-strip">${cat.gallery.map(g => `<img src="${g}" alt="" width="480" height="480" loading="lazy">`).join('')}</div>`;
  if (cat.notice) html += `<p class="cat-alert" role="note"><strong>Atenção ao valor</strong>${esc(cat.notice)}</p>`;
  html += `</div>`;
  if (cat.cake) {
    html += `<div class="cake-lines">${cat.lines.map(cakeLine).join('')}</div>`;
  } else {
    html += `<ul class="items" role="list">${cat.items.map(it => itemRow(ITEM[it.id])).join('')}</ul>`;
  }
  body.innerHTML = html;
  if (cat.cake) for (const f of $$('[data-cake-form]', body)) syncCakeForm(f);
  renderSheetFoot();
}

function minbar() {
  const t = totals();
  if (!t.docinhos) return '';
  const pct = Math.min(100, (t.docinhos / DOCINHOS_MIN) * 100);
  const ok = t.docinhos >= DOCINHOS_MIN;
  return `<div class="minbar${ok ? ' is-ok' : ''}">
    <div class="minbar__text"><span>${ok ? 'Pedido mínimo de docinhos atingido' : `Faltam <b>${DOCINHOS_MIN - t.docinhos}</b> docinhos para o mínimo`}</span><b>${t.docinhos}/${DOCINHOS_MIN}</b></div>
    <div class="minbar__track" role="progressbar" aria-label="Docinhos para o pedido mínimo" aria-valuemin="0" aria-valuemax="${DOCINHOS_MIN}" aria-valuenow="${Math.min(t.docinhos, DOCINHOS_MIN)}"><div class="minbar__fill" style="width:${pct}%"></div></div>
  </div>`;
}

function renderSheetFoot() {
  const t = totals();
  const foot = $('[data-sheet-foot]');
  if (!t.lines) { foot.innerHTML = ''; return; }
  foot.innerHTML = `${minbar()}<div class="foot-row"><p class="foot-total">${brl(t.sum)}<small>${summaryLine(t)}</small></p><button class="btn btn--red" type="button" data-open-bag>Ver sacola ${ICON.arrow.replace('<svg', '<svg class="arrow"')}</button></div>`;
}

function summaryLine(t) {
  const parts = [];
  if (t.units) parts.push(`${t.units} doces`);
  if (t.cakes) parts.push(`${t.cakes} bolo${t.cakes > 1 ? 's' : ''}`);
  return parts.join(' e ');
}

function syncCakeForm(form) {
  const line = BY_ID.bolos.lines.find(l => l.id === form.dataset.cakeForm);
  const sizeId = new FormData(form).get(`cake-${line.id}-size`);
  const size = line.sizes.find(s => s.id === sizeId);
  const f2 = $('[data-f2]', form);
  const two = size.flavors > 1;
  f2.hidden = !two;
  if (!two) $('select', f2).value = '';
}

function openCat(id, line) {
  if (!BY_ID[id]) return;
  if (current !== id || !sheet.open) track('ViewContent', { content_name: BY_ID[id].title, content_category: 'Categoria', content_ids: [id], content_type: 'product_group' });
  current = id; focusLine = line || null;
  renderSheet();
  if (bagSheet.open) bagSheet.close();
  if (!sheet.open) { sheet.showModal(); document.body.classList.add('is-locked'); }
  const body = $('[data-sheet-body]');
  body.scrollTop = 0;
  if (line) { const el = $(`#line-${line}`); if (el) el.scrollIntoView({ block: 'start' }); }
}

function closeSheets() {
  if (sheet.open) sheet.close();
  if (bagSheet.open) bagSheet.close();
  document.body.classList.remove('is-locked');
}

/* ---------------- bag ---------------- */
function bagLines() {
  const groups = [];
  for (const c of CATEGORIES) {
    if (c.cake) continue;
    const rows = c.items.filter(it => state.qty[it.id]).map(it => ({ it: ITEM[it.id], q: state.qty[it.id] }));
    if (rows.length) groups.push({ cat: c, rows });
  }
  return groups;
}

function problems() {
  const t = totals();
  const out = [];
  if (t.docinhos && t.docinhos < DOCINHOS_MIN) out.push(`Os docinhos (Tradicionais, Gourmet e Exclusiva) somam ${t.docinhos}. O mínimo é ${DOCINHOS_MIN}: adicione mais ${DOCINHOS_MIN - t.docinhos}.`);
  return out;
}

function minDate() {
  const d = new Date(); d.setDate(d.getDate() + 2);
  return d.toISOString().slice(0, 10);
}

function renderBag() {
  const t = totals();
  const body = $('[data-bag-body]');
  if (!t.lines) {
    body.innerHTML = `<div class="bag-empty"><span class="seal"><img src="assets/img/p0614-9-sm.webp" alt="" width="480" height="480"></span><p>Sua sacola está vazia. Escolha uma categoria e adicione os sabores.</p><a class="btn btn--red" href="#cardapio" data-close-go>Ver o cardápio</a></div>`;
    return;
  }
  let html = '';
  for (const g of bagLines()) {
    html += `<p class="bag-group">${esc(g.cat.title)}</p><ul class="bag-list" role="list">`;
    for (const { it, q } of g.rows) {
      html += `<li class="bag-row"><div><div class="bag-row__name">${q} × ${esc(it.name)}</div><div class="bag-row__sub">${it.cat.fromPrice ? 'a partir de ' : ''}${brl(it.price)} cada · ${brl(q * it.price)}</div>${it.cat.fromPrice ? '<div class="bag-row__note">Pode ter adicional conforme a arte e o tipo de carimbo</div>' : ''}</div>
        <div class="stepper" role="group" aria-label="Quantidade de ${esc(it.name)}"><button type="button" data-dec="${it.id}" aria-label="Tirar ${it.cat.step}">${ICON.minus}</button><output>${q}</output><button type="button" data-inc="${it.id}" aria-label="Mais ${it.cat.step}">${ICON.plus}</button></div></li>`;
    }
    html += `</ul>`;
  }
  if (state.cakes.length) {
    html += `<p class="bag-group">Bolos</p><ul class="bag-list" role="list">`;
    state.cakes.forEach((c, i) => {
      html += `<li class="bag-row"><div><div class="bag-row__name">${esc(c.line)}, ${esc(c.size)}</div><div class="bag-row__sub">${esc(c.flavors.join(' e '))} · ${brl(c.price)}</div><button class="bag-row__rm" type="button" data-rm-cake="${i}">Remover</button></div></li>`;
    });
    html += `</ul>`;
  }
  html += `<div class="bag-sum" data-bag-sum></div>`;
  const probs = problems();
  html += probs.length ? probs.map(p => `<p class="notice">${esc(p)}</p>`).join('') : '';
  if (bagLines().some(g => g.cat.fromPrice)) html += `<p class="cat-alert" role="note"><strong>Personalizados</strong>O total é uma estimativa: os personalizados podem ter adicional conforme a arte e o tipo de carimbo. A loja confirma o valor final pelo WhatsApp.</p>`;
  html += `<form class="bag-form" data-bag-form novalidate>
    <h3>Seus dados para a encomenda</h3>
    <div class="field"><label for="f-nome">Seu nome</label><input id="f-nome" name="nome" autocomplete="name" required><p class="err" id="e-nome"></p></div>
    <div class="field"><label for="f-tel">Seu WhatsApp <span style="font-weight:400;color:var(--muted)">(opcional)</span></label><input id="f-tel" name="tel" type="tel" inputmode="tel" autocomplete="tel"></div>
    <div class="field"><span class="lbl" id="lbl-modo">Como vai receber</span>
      <div class="seg" role="radiogroup" aria-labelledby="lbl-modo">
        <label><input type="radio" name="modo" value="Retirada" checked>Retirar na loja</label>
        <label><input type="radio" name="modo" value="Entrega">Entrega</label>
      </div></div>
    <div class="entrega" data-entrega hidden>
      <div class="field"><label for="f-bairro">Bairro ou cidade</label>
        <select id="f-bairro" name="bairro"><option value="">Escolha o bairro</option>${DELIVERY.map(g => `<optgroup label="${esc(g.group)}">${g.areas.map(([n, v]) => `<option value="${esc(n)}">${esc(n)} · ${feeLabel(v)}</option>`).join('')}</optgroup>`).join('')}</select>
        <p class="err" id="e-bairro"></p></div>
      <div class="field"><label for="f-end">Rua, número e ponto de referência</label><input id="f-end" name="endereco" autocomplete="street-address"><p class="err" id="e-end"></p></div>
    </div>
    <p class="pickup-note" data-retirada>Você retira na loja, em Juazeiro do Norte. O horário é confirmado pelo WhatsApp.</p>
    <div class="grid2">
      <div class="field"><label for="f-data">Data da festa</label><input id="f-data" name="data" type="date" min="${minDate()}" required><p class="err" id="e-data"></p></div>
      <div class="field"><label for="f-per">Período</label><select id="f-per" name="periodo"><option>Manhã</option><option>Tarde</option><option>Início da noite</option></select></div>
    </div>
    <div class="field"><label for="f-obs">Observações</label><textarea id="f-obs" name="obs" placeholder="Cor das forminhas, nome no carimbo, sabor da massa das flores, tema da festa"></textarea></div>
    <button class="btn btn--red bag-send" type="submit">${ICON.wa}Enviar pedido pelo WhatsApp</button>
  </form>`;
  body.innerHTML = html;
  restoreForm();
}

const FORM_KEY = 'cariri-dados-v1';
function restoreForm() {
  const f = $('[data-bag-form]'); if (!f) return;
  let d = {}; try { d = JSON.parse(localStorage.getItem(FORM_KEY) || '{}'); } catch {}
  for (const [k, v] of Object.entries(d)) {
    const el = f.elements[k]; if (!el) continue;
    if (el instanceof RadioNodeList) { for (const r of el) r.checked = r.value === v; } else el.value = v;
  }
  if (f.elements.data.value && f.elements.data.value < minDate()) f.elements.data.value = '';
  toggleEntrega(f);
}
function persistForm(f) {
  const d = Object.fromEntries(new FormData(f));
  try { localStorage.setItem(FORM_KEY, JSON.stringify(d)); } catch {}
}
function deliveryFee(f) {
  if (!f || f.elements.modo.value !== 'Entrega') return { on: false, fee: 0, known: true };
  const b = f.elements.bairro.value;
  if (!b) return { on: true, fee: 0, known: false, none: true };
  const v = FEES.get(b);
  return { on: true, fee: v ?? 0, known: v !== null && v !== undefined, area: b };
}
function updateSum(f) {
  const box = $('[data-bag-sum]'); if (!box) return;
  const t = totals(); const d = deliveryFee(f);
  let html = `<p class="bag-line"><span>Doces e bolos</span><span>${brl(t.sum)}</span></p>`;
  if (d.on) html += `<p class="bag-line"><span>Entrega${d.area ? ` (${esc(d.area)})` : ''}</span><span>${d.none ? 'escolha o bairro' : d.known ? (d.fee ? brl(d.fee) : 'grátis') : 'a combinar'}</span></p>`;
  html += `<p class="bag-total"><span>Total${d.on && !d.known ? ' sem entrega' : ''}</span><span>${brl(t.sum + (d.on ? d.fee : 0))}</span></p>`;
  box.innerHTML = html;
}
function toggleEntrega(f) {
  const on = f.elements.modo.value === 'Entrega';
  $('[data-entrega]', f).hidden = !on;
  $('[data-retirada]', f).hidden = on;
  updateSum(f);
}

function fieldErr(f, name, errId, msg) {
  const el = f.elements[name];
  $('#' + errId).textContent = msg || '';
  el.setAttribute('aria-invalid', msg ? 'true' : 'false');
  if (msg) el.setAttribute('aria-describedby', errId); else el.removeAttribute('aria-describedby');
  return !msg;
}

function sendOrder(f) {
  const d = Object.fromEntries(new FormData(f));
  let ok = true, first = null;
  const check = (name, id, msg) => { const good = fieldErr(f, name, id, msg); if (!good && !first) first = f.elements[name]; ok = ok && good; };
  check('nome', 'e-nome', d.nome.trim() ? '' : 'Diga seu nome para a gente te chamar.');
  if (d.modo === 'Entrega') {
    check('bairro', 'e-bairro', d.bairro ? '' : 'Escolha o bairro da entrega.');
    check('endereco', 'e-end', d.endereco.trim() ? '' : 'Informe a rua e o número.');
  }
  check('data', 'e-data', !d.data ? 'Escolha a data da festa.' : d.data < minDate() ? 'Precisamos de 48 horas: escolha a partir de ' + fmtDate(minDate()) + '.' : '');
  const probs = problems();
  if (!ok) { first && first.focus(); return; }
  if (probs.length) { toast('Complete o pedido mínimo antes de enviar'); $('.notice')?.scrollIntoView({ block: 'center', behavior: reduced ? 'auto' : 'smooth' }); return; }
  persistForm(f);

  const lines = ['Olá, Cariri Sucré! Quero fazer uma encomenda pelo site:', ''];
  for (const g of bagLines()) {
    lines.push(`*${g.cat.title}*`);
    for (const { it, q } of g.rows) lines.push(`• ${q} ${it.name} (${g.cat.fromPrice ? 'a partir de ' : ''}${brl(q * it.price)})`);
    if (g.cat.fromPrice) lines.push('  _Valor a confirmar: pode ter adicional conforme a arte e o tipo de carimbo._');
    lines.push('');
  }
  if (state.cakes.length) {
    lines.push('*Bolos*');
    for (const c of state.cakes) lines.push(`• ${c.line}, ${c.size}, ${c.flavors.join(' e ')} (${brl(c.price)})`);
    lines.push('');
  }
  const dl = deliveryFee(f);
  if (dl.on) lines.push(`Entrega (${dl.area}): ${dl.known ? (dl.fee ? brl(dl.fee) : 'grátis') : 'taxa a combinar'}`);
  lines.push(`*Total: ${brl(totals().sum + (dl.on ? dl.fee : 0))}${dl.on && !dl.known ? ' + entrega' : ''}*`, '');
  lines.push(`Nome: ${d.nome.trim()}`);
  if (d.tel && d.tel.trim()) lines.push(`WhatsApp: ${d.tel.trim()}`);
  lines.push(d.modo === 'Entrega' ? `Endereço: ${d.endereco.trim()}, ${d.bairro}` : 'Retirada na loja');
  lines.push(`Data: ${fmtDate(d.data)}, ${d.periodo.toLowerCase()}`);
  if (d.obs.trim()) lines.push(`Observações: ${d.obs.trim()}`);
  const t = totals();
  const contents = Object.entries(state.qty).map(([id, q]) => ({ id, quantity: q, item_price: ITEM[id].price }));
  track('Schedule', { value: +t.sum.toFixed(2), currency: 'BRL', scheduled_date: d.data, delivery_mode: d.modo });
  track('Lead', { content_name: 'Encomenda Cariri Sucré via Site', value: +t.sum.toFixed(2), currency: 'BRL' });
  track('Purchase', { value: +t.sum.toFixed(2), currency: 'BRL', content_type: 'product', num_items: t.units + t.cakes, contents });
  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`;
  const w = window.open(url, '_blank', 'noopener');
  if (!w) location.href = url;
  trackCustom('PedidoEnviadoWhatsApp', { value: +t.sum.toFixed(2), currency: 'BRL', modo: d.modo, bairro: d.modo === 'Entrega' ? d.bairro : undefined });
}

function fmtDate(iso) {
  const [y, m, dd] = iso.split('-').map(Number);
  const dt = new Date(y, m - 1, dd);
  return dt.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit' });
}

function openBag() {
  renderBag();
  const t = totals();
  if (t.lines) track('InitiateCheckout', { value: +t.sum.toFixed(2), currency: 'BRL', num_items: t.units + t.cakes, content_type: 'product' });
  if (sheet.open) sheet.close();
  if (!bagSheet.open) { bagSheet.showModal(); document.body.classList.add('is-locked'); }
  $('[data-bag-body]').scrollTop = 0;
}

/* ---------------- shared refresh ---------------- */
let lastUnits = -1;
function refresh() {
  const t = totals();
  const count = $('[data-bag-count]');
  const n = t.units + t.cakes;
  count.hidden = !t.lines;
  count.textContent = n;
  $('.bag-btn').setAttribute('aria-label', t.lines ? `Abrir sacola, ${summaryLine(t)}, ${brl(t.sum)}` : 'Abrir sacola, vazia');
  if (lastUnits >= 0 && n > lastUnits && !reduced) { const b = $('.bag-btn'); b.classList.remove('is-bump'); void b.offsetWidth; b.classList.add('is-bump'); }
  lastUnits = n;
  const bar = $('[data-bagbar]');
  bar.hidden = !t.lines;
  document.body.classList.toggle('has-bag', !!t.lines);
  $('[data-bagbar-sum]').innerHTML = t.lines ? `${brl(t.sum)}<small>${summaryLine(t)}${t.docinhos && t.docinhos < DOCINHOS_MIN ? ` · faltam ${DOCINHOS_MIN - t.docinhos} docinhos` : ''}</small>` : '';
  renderTray();
  if (sheet.open) {
    const body = $('[data-sheet-body]'); const top = body.scrollTop;
    const cat = BY_ID[current];
    if (!cat.cake) { $('.items', body).innerHTML = cat.items.map(it => itemRow(ITEM[it.id])).join(''); }
    renderSheetFoot();
    body.scrollTop = top;
  }
  if (bagSheet.open) { const body = $('[data-bag-body]'); const top = body.scrollTop; const f = $('[data-bag-form]'); if (f) persistForm(f); renderBag(); body.scrollTop = top; }
}

let toastT;
function toast(msg) {
  const el = $('[data-toast]');
  el.textContent = msg; el.classList.add('is-on');
  clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('is-on'), 2200);
}

/* ---------------- routing (back button closes the sheet) ---------------- */
function route() {
  const h = decodeURIComponent(location.hash.slice(1));
  if (h.startsWith('c/')) { const [, id, line] = h.split('/'); if (BY_ID[id]) { openCat(id, line); return; } }
  if (h === 'sacola') { openBag(); return; }
  if (sheet.open || bagSheet.open) closeSheets();
}
function go(hash) {
  if (location.hash === '#' + hash) route();
  else location.hash = hash;
}
function closeViaHistory() {
  const h = location.hash;
  if (h.startsWith('#c/') || h === '#sacola') {
    history.replaceState(null, '', location.pathname + location.search);
  }
  closeSheets();
}

/* ---------------- events ---------------- */
document.addEventListener('click', e => {
  const t = e.target.closest('button, a');
  if (!t) return;
  if (t.matches('[data-open-cat]')) { e.preventDefault(); go(`c/${t.dataset.openCat}${t.dataset.line ? '/' + t.dataset.line : ''}`); return; }
  if (t.matches('[data-chip]')) { const id = t.dataset.chip; history.replaceState(null, '', '#c/' + id); openCat(id); return; }
  if (t.matches('[data-inc]')) {
    const it = ITEM[t.dataset.inc]; const q = state.qty[it.id] || 0;
    const add = q ? it.cat.step : it.cat.min;
    setQty(it.id, q + add);
    track('AddToCart', { content_name: it.name, content_category: it.cat.title, content_ids: [it.id], content_type: 'product', value: +(add * it.price).toFixed(2), currency: 'BRL', num_items: add });
    if (!q) toast(`${it.cat.min} ${it.name} na sacola`);
    return;
  }
  if (t.matches('[data-dec]')) {
    const it = ITEM[t.dataset.dec]; const q = state.qty[it.id] || 0;
    setQty(it.id, q - it.cat.step < it.cat.min ? 0 : q - it.cat.step);
    return;
  }
  if (t.matches('[data-rm-cake]')) { state.cakes.splice(+t.dataset.rmCake, 1); save(); refresh(); return; }
  if (t.matches('[data-open-bag]')) { e.preventDefault(); if (location.hash === '#sacola') openBag(); else location.hash = 'sacola'; return; }
  if (t.matches('[data-close]')) { closeViaHistory(); return; }
  if (t.matches('[data-close-go]')) { closeViaHistory(); return; }
  if (t.matches('[data-wall-toggle]')) { wallPaused = !wallPaused; t.setAttribute('aria-pressed', String(wallPaused)); t.textContent = wallPaused ? 'Tocar vídeos' : 'Pausar vídeos'; syncWall(); return; }
});

for (const d of [sheet, bagSheet]) {
  d.addEventListener('cancel', e => { e.preventDefault(); closeViaHistory(); });
  d.addEventListener('click', e => { if (e.target === d) closeViaHistory(); });
}

document.addEventListener('change', e => {
  const f = e.target.closest('[data-cake-form]');
  if (f) syncCakeForm(f);
  const b = e.target.closest('[data-bag-form]');
  if (b) { if (e.target.name === 'modo') toggleEntrega(b); else updateSum(b); persistForm(b); }
});

document.addEventListener('submit', e => {
  const f = e.target;
  if (f.matches('[data-cake-form]')) {
    e.preventDefault();
    const line = BY_ID.bolos.lines.find(l => l.id === f.dataset.cakeForm);
    const fd = new FormData(f);
    const size = line.sizes.find(s => s.id === fd.get(`cake-${line.id}-size`));
    const flavors = [fd.get('f1'), size.flavors > 1 ? fd.get('f2') : ''].filter(Boolean);
    const uniq = [...new Set(flavors)];
    state.cakes.push({ line: line.name, size: size.label, flavors: uniq, price: size.price });
    track('AddToCart', { content_name: `${line.name} ${size.label}`, content_category: 'Bolos', content_ids: [size.id], content_type: 'product', value: size.price, currency: 'BRL', num_items: 1 });
    save(); refresh();
    toast(`${line.name} na sacola`);
    return;
  }
  if (f.matches('[data-bag-form]')) { e.preventDefault(); sendOrder(f); }
});

/* nav shadow */
const nav = $('.nav');
const onScroll = () => nav.classList.toggle('is-scrolled', scrollY > 8);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* videos: play only on screen; pause control for the wall */
let wallPaused = reduced;
const vis = new Map();
function syncWall() {
  for (const v of $$('video')) {
    const want = vis.get(v) && !(v.matches('[data-wall]') ? wallPaused : reduced);
    if (want) { if (v.preload === 'none') v.preload = 'metadata'; v.play().catch(() => {}); } else v.pause();
  }
}
const io = new IntersectionObserver(es => { for (const e of es) vis.set(e.target, e.isIntersecting); syncWall(); }, { rootMargin: '120px' });
for (const v of $$('video')) { if (reduced) v.removeAttribute('autoplay'); io.observe(v); }
if (reduced) { const b = $('[data-wall-toggle]'); b.setAttribute('aria-pressed', 'true'); b.textContent = 'Tocar vídeos'; }

/* welcome gate */
const gate = $('[data-gate]');
function closeGate(then) {
  try { sessionStorage.setItem('cs-gate', '1'); } catch {}
  const html = document.documentElement;
  if (!html.classList.contains('show-gate')) { then && then(); return; }
  const done = () => { html.classList.remove('show-gate'); gate.classList.remove('is-leaving'); then && then(); };
  if (reduced) done(); else { gate.classList.add('is-leaving'); setTimeout(done, 420); }
}
if (document.documentElement.classList.contains('show-gate')) setTimeout(() => $('[data-gate-order]')?.focus({ preventScroll: true }), 50);
gate.addEventListener('click', e => {
  if (e.target.closest('[data-gate-order]')) { trackCustom('EntradaMontarPedido'); closeGate(() => $('#cardapio').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })); }
  else if (e.target.closest('[data-gate-talk]')) closeGate();
});

addEventListener('hashchange', route);
refresh();
route();

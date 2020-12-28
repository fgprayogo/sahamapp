const bln1tengah = await yahooFinance.historical({
    symbol: code_saham,
    from: '2019-01-14',
    to: '2019-01-17',
})
const bln1akhir = await yahooFinance.historical({
    symbol: code_saham,
    from: '2019-01-29',
    to: '2019-02-01',
})
const bln2tengah = await yahooFinance.historical({
    symbol: code_saham,
    from: '2019-02-14',
    to: '2019-02-17',
})
const bln2akhir = await yahooFinance.historical({
    symbol: code_saham,
    from: '2019-02-28',
    to: '2019-03-1',
})
const bln3tengah = await yahooFinance.historical({
    symbol: code_saham,
    from: '2019-03-14',
    to: '2019-03-17',
})
const bln3akhir = await yahooFinance.historical({
    symbol: code_saham,
    from: '2019-03-28',
    to: '2019-04-1',
})
const bln4tengah = await yahooFinance.historical({
    symbol: code_saham,
    from: '2019-04-14',
    to: '2019-04-17',
})
const bln4akhir = await yahooFinance.historical({
    symbol: code_saham,
    from: '2019-04-28',
    to: '2019-05-1',
})
const bln5tengah = await yahooFinance.historical({
    symbol: code_saham,
    from: '2019-05-14',
    to: '2019-05-17',
})
const bln5akhir = await yahooFinance.historical({
    symbol: code_saham,
    from: '2019-05-28',
    to: '2019-06-1',
})
const bln6tengah = await yahooFinance.historical({
    symbol: code_saham,
    from: '2019-06-14',
    to: '2019-06-17',
})
const bln6akhir = await yahooFinance.historical({
    symbol: code_saham,
    from: '2019-06-28',
    to: '2019-07-1',
})
const bln7tengah = await yahooFinance.historical({
    symbol: code_saham,
    from: '2019-07-14',
    to: '2019-07-17',
})
const bln7akhir = await yahooFinance.historical({
    symbol: code_saham,
    from: '2019-07-28',
    to: '2019-08-1',
})
const bln8tengah = await yahooFinance.historical({
    symbol: code_saham,
    from: '2019-08-14',
    to: '2019-08-17',
})
const bln8akhir = await yahooFinance.historical({
    symbol: code_saham,
    from: '2019-08-28',
    to: '2019-09-1',
})
const bln9tengah = await yahooFinance.historical({
    symbol: code_saham,
    from: '2019-09-14',
    to: '2019-09-17',
})
const bln9akhir = await yahooFinance.historical({
    symbol: code_saham,
    from: '2019-09-28',
    to: '2019-10-1',
})
const bln10tengah = await yahooFinance.historical({
    symbol: code_saham,
    from: '2019-10-14',
    to: '2019-10-17',
})
const bln10akhir = await yahooFinance.historical({
    symbol: code_saham,
    from: '2019-10-28',
    to: '2019-11-1',
})
const bln11tengah = await yahooFinance.historical({
    symbol: code_saham,
    from: '2019-11-14',
    to: '2019-11-17',
})
const bln11akhir = await yahooFinance.historical({
    symbol: code_saham,
    from: '2019-11-28',
    to: '2019-12-1',
})
const bln12tengah = await yahooFinance.historical({
    symbol: code_saham,
    from: '2019-12-14',
    to: '2019-12-17',
})

return response.json({
    bln1tengah : bln1tengah[0],
    bln1akhir : bln1akhir[0],
    bln2tengah : bln2tengah[0],
    bln2akhir :bln2akhir[0],
})



function getArraySum(a){
    var total=0;
    for(var i in a) { 
        total += a[i];
    }
    return total;
}

var payChecks = [123,155,134, 205, 105]; 
var weeklyPay= getArraySum(payChecks); 
return weeklyPay



//eps q4 2019

const code = [
    { "kode_saham": "ADRO.JK", "harga_wajar": "1393,875" },
    { "kode_saham": "AKRA.JK", "harga_wajar": "148,07375" },
    { "kode_saham": "ANTM.JK", "harga_wajar": "748,8" },
    { "kode_saham": "ASII.JK", "harga_wajar": "6227,784" },
    { "kode_saham": "BBCA.JK", "harga_wajar": "30073,68" },
    { "kode_saham": "BBNI.JK", "harga_wajar": "6612,354" },
    { "kode_saham": "BBRI.JK", "harga_wajar": "3952,827" },
    { "kode_saham": "BBTN.JK", "harga_wajar": "1816,191" },
    { "kode_saham": "BMRI.JK", "harga_wajar": "6270,858" },
    { "kode_saham": "BRPT.JK", "harga_wajar": "1183,302" },
    { "kode_saham": "BSDE.JK", "harga_wajar": "1128,825" },
    { "kode_saham": "BTPS.JK", "harga_wajar": "3814,452" },
    { "kode_saham": "CPIN.JK", "harga_wajar": "5839,704" },
    { "kode_saham": "CTRA.JK", "harga_wajar": "930,186" },
    { "kode_saham": "ERAA.JK", "harga_wajar": "1607,148" },
    { "kode_saham": "EXCL.JK", "harga_wajar": "2806,65" },
    { "kode_saham": "GGRM.JK", "harga_wajar": "47680,182" },
    { "kode_saham": "HMSP.JK", "harga_wajar": "1874,34" },
    { "kode_saham": "ICBP.JK", "harga_wajar": "10034,928" },
    { "kode_saham": "INCO.JK", "harga_wajar": "3263,76" },
    { "kode_saham": "INDF.JK", "harga_wajar": "7121,196" },
    { "kode_saham": "INDY.JK", "harga_wajar": "1065,312" },
    { "kode_saham": "INKP.JK", "harga_wajar": "6931,665" },
    { "kode_saham": "INTP.JK", "harga_wajar": "672,3" },
    { "kode_saham": "ITMG.JK", "harga_wajar": "10336,977" },
    { "kode_saham": "JPFA.JK", "harga_wajar": "1377" },
    { "kode_saham": "JSMR.JK", "harga_wajar": "4656,672" },
    { "kode_saham": "KLBF.JK", "harga_wajar": "1444,833" },
    { "kode_saham": "LPPF.JK", "harga_wajar": "3786,912" },
    { "kode_saham": "MEDC.JK", "harga_wajar": "770,742" },
    { "kode_saham": "MNCN.JK", "harga_wajar": "1462,968" },
    { "kode_saham": "PGAS.JK", "harga_wajar": "1915,2" },
    { "kode_saham": "PTBA.JK", "harga_wajar": "2391,84" },
    { "kode_saham": "PTPP.JK", "harga_wajar": "1425,06" },
    { "kode_saham": "PWON.JK", "harga_wajar": "508,536" },
    { "kode_saham": "SCMA.JK", "harga_wajar": "1253,232" },
    { "kode_saham": "SMGR.JK", "harga_wajar": "10790,325" },
    { "kode_saham": "SRIL.JK", "harga_wajar": "231,516" },
    { "kode_saham": "TKIM.JK", "harga_wajar": "9241,434" },
    { "kode_saham": "TLKM.JK", "harga_wajar": "3565,044" },
    { "kode_saham": "TPIA.JK", "harga_wajar": "8900,316" },
    { "kode_saham": "UNTR.JK", "harga_wajar": "19374,48" },
    { "kode_saham": "UNVR.JK", "harga_wajar": "37766,52" },
    { "kode_saham": "WIKA.JK", "harga_wajar": "1785,366" },
    { "kode_saham": "WSKT.JK", "harga_wajar": "1334,529" },
]

//end eps q4 2019
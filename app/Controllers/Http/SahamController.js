'use strict'
const Mail = use('Mail');
var yahooFinance = require('yahoo-finance');
var si = require('stock-info');

class SahamController {
    async analisisSingleEmiten({ request, view, response, auth }) {
        return view.render('analisis_single_emiten')
    }
    async analisisAllEmiten({ request, view, response, auth }) {
        const code = [
            { "kode_saham": "AALI.JK" },
            { "kode_saham": "ACES.JK" },
            { "kode_saham": "ADHI.JK" },
            { "kode_saham": "ADRO.JK" },
            { "kode_saham": "AKRA.JK" },
            { "kode_saham": "ANTM.JK" },
            { "kode_saham": "APLN.JK" },
            { "kode_saham": "ASII.JK" },
            { "kode_saham": "ASSA.JK" },
            { "kode_saham": "BBCA.JK" },
            { "kode_saham": "BBNI.JK" },
            { "kode_saham": "BBRI.JK" },
            { "kode_saham": "BBTN.JK" },
            { "kode_saham": "BEST.JK" },
            { "kode_saham": "BJBR.JK" },
            { "kode_saham": "BJTM.JK" },
            { "kode_saham": "BKSL.JK" },
            { "kode_saham": "BMRI.JK" },
            { "kode_saham": "BMTR.JK" },
            { "kode_saham": "BNGA.JK" },
            { "kode_saham": "BNLI.JK" },
            { "kode_saham": "BOGA.JK" },
            { "kode_saham": "BRPT.JK" },
            { "kode_saham": "BSDE.JK" },
            { "kode_saham": "BTPS.JK" },
            { "kode_saham": "CLEO.JK" },
            { "kode_saham": "CPIN.JK" },
            { "kode_saham": "CTRA.JK" },
            { "kode_saham": "DMAS.JK" },
            { "kode_saham": "ELSA.JK" },
            { "kode_saham": "ERAA.JK" },
            { "kode_saham": "ESSA.JK" },
            { "kode_saham": "EXCL.JK" },
            { "kode_saham": "GGRM.JK" },
            { "kode_saham": "GIAA.JK" },
            { "kode_saham": "HMSP.JK" },
            { "kode_saham": "HOKI.JK" },
            { "kode_saham": "HRUM.JK" },
            { "kode_saham": "ICBP.JK" },
            { "kode_saham": "INCO.JK" },
            { "kode_saham": "INDF.JK" },
            { "kode_saham": "INDY.JK" },
            { "kode_saham": "INKP.JK" },
            { "kode_saham": "INTP.JK" },
            { "kode_saham": "ISAT.JK" },
            { "kode_saham": "ITMG.JK" },
            { "kode_saham": "JPFA.JK" },
            { "kode_saham": "JRPT.JK" },
            { "kode_saham": "JSMR.JK" },
            { "kode_saham": "KBLI.JK" },
            { "kode_saham": "KLBF.JK" },
            { "kode_saham": "LPKR.JK" },
            { "kode_saham": "LPPF.JK" },
            { "kode_saham": "LSIP.JK" },
            { "kode_saham": "MAIN.JK" },
            { "kode_saham": "MAPI.JK" },
            { "kode_saham": "MDKA.JK" },
            { "kode_saham": "MEDC.JK" },
            { "kode_saham": "MGRO.JK" },
            { "kode_saham": "MIKA.JK" },
            { "kode_saham": "MNCN.JK" },
            { "kode_saham": "MTDL.JK" },
            { "kode_saham": "MYOR.JK" },
            { "kode_saham": "PGAS.JK" },
            { "kode_saham": "PNBN.JK" },
            { "kode_saham": "PNLF.JK" },
            { "kode_saham": "PPRO.JK" },
            { "kode_saham": "PTBA.JK" },
            { "kode_saham": "PTPP.JK" },
            { "kode_saham": "PWON.JK" },
            { "kode_saham": "RALS.JK" },
            { "kode_saham": "SCMA.JK" },
            { "kode_saham": "SIDO.JK" },
            { "kode_saham": "SILO.JK" },
            { "kode_saham": "SMBR.JK" },
            { "kode_saham": "SMCB.JK" },
            { "kode_saham": "SMGR.JK" },
            { "kode_saham": "SMRA.JK" },
            { "kode_saham": "SMSM.JK" },
            { "kode_saham": "SPTO.JK" },
            { "kode_saham": "SRIL.JK" },
            { "kode_saham": "SSIA.JK" },
            { "kode_saham": "SSMS.JK" },
            { "kode_saham": "TBIG.JK" },
            { "kode_saham": "TDPM.JK" },
            { "kode_saham": "TELE.JK" },
            { "kode_saham": "TINS.JK" },
            { "kode_saham": "TKIM.JK" },
            { "kode_saham": "TLKM.JK" },
            { "kode_saham": "TOPS.JK" },
            { "kode_saham": "TOWR.JK" },
            { "kode_saham": "TPIA.JK" },
            { "kode_saham": "UNTR.JK" },
            { "kode_saham": "UNVR.JK" },
            { "kode_saham": "WEGE.JK" },
            { "kode_saham": "WIKA.JK" },
            { "kode_saham": "WOOD.JK" },
            { "kode_saham": "WSBP.JK" },
            { "kode_saham": "WSKT.JK" },
            { "kode_saham": "WTON.JK" },
        ]
        var sum = []
        let undervalued_sum_10 = []
        let undervalued_sum_20 = []
        let undervalued_sum_30 = []
        let undervalued_sum_40 = []
        let undervalued_sum_50 = []

        //asumsi eps growth 10% stabil
        function hrgWjr10(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 10
            const deposito_indo = 6.5
            const obligasi_indo = 11
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * deposito_indo) / obligasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return parseInt(harga_wajar)
        }
        //asumsi eps growth 20% stabil
        function hrgWjr20(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 20
            const deposito_indo = 6.5
            const obligasi_indo = 11
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * deposito_indo) / obligasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return parseInt(harga_wajar)
        }
        //asumsi eps growth 30% stabil
        function hrgWjr30(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 30
            const deposito_indo = 6.5
            const obligasi_indo = 11
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * deposito_indo) / obligasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return parseInt(harga_wajar)
        }
        //asumsi eps growth 40% stabil
        function hrgWjr40(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 40
            const deposito_indo = 6.5
            const obligasi_indo = 11
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * deposito_indo) / obligasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return parseInt(harga_wajar)
        }
        //asumsi eps growth 50% stabil
        function hrgWjr50(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 50
            const deposito_indo = 6.5
            const obligasi_indo = 11
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * deposito_indo) / obligasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return parseInt(harga_wajar)
        }
        for (var i = 0; i < code.length; i++) {
            const data = await yahooFinance.quote({
                symbol: code[i].kode_saham,
                modules: ['price', 'earnings', 'financialData', 'defaultKeyStatistics']  // ex: ['price', 'summaryDetail']
            });
            const last_price = data.price.regularMarketPrice
            const EPS = data.defaultKeyStatistics.trailingEps
            const DER = data.financialData.debtToEquity

            // const data = await si.getSingleStockInfo(code[i].kode_saham)
            // const last_price = data.regularMarketPrice
            // const EPS = data.epsTrailingTwelveMonths

            const code_saham = code[i].kode_saham

            //memanggil fungsi
            const harga_wajar_10 = hrgWjr10(EPS)
            const harga_wajar_20 = hrgWjr20(EPS)
            const harga_wajar_30 = hrgWjr30(EPS)
            const harga_wajar_40 = hrgWjr40(EPS)
            const harga_wajar_50 = hrgWjr50(EPS)

            //low
            if (last_price < harga_wajar_10) {
                var status = "UNDERVALUED"
                // const persentase_kemurahan = ((harga_wajar_10/last_price)-1)*100
                const persentase_kemurahan = 10
                const undervalued = { "last_price": last_price, "harga_wajar": harga_wajar_10, "code_saham": code_saham, "persentase_kemurahan": parseInt(persentase_kemurahan), "status": status }
                undervalued_sum_10.push(undervalued)
            } else {
                var status = "OVERVALUED"
            }

            //medium
            if (last_price < harga_wajar_20) {
                var status = "UNDERVALUED"
                // const persentase_kemurahan = ((harga_wajar_20/last_price)-1)*100
                const persentase_kemurahan = 10
                const undervalued = { "last_price": last_price, "harga_wajar": harga_wajar_20, "code_saham": code_saham, "persentase_kemurahan": parseInt(persentase_kemurahan), "status": status }
                undervalued_sum_20.push(undervalued)
            } else {
                var status = "OVERVALUED"
            }

            //high
            if (last_price < harga_wajar_30) {
                var status = "UNDERVALUED"
                // const persentase_kemurahan = ((harga_wajar_30/last_price)-1)*100
                const persentase_kemurahan = 10
                const undervalued = { "last_price": last_price, "harga_wajar": harga_wajar_30, "code_saham": code_saham, "persentase_kemurahan": parseInt(persentase_kemurahan), "status": status }
                undervalued_sum_30.push(undervalued)
            } else {
                var status = "OVERVALUED"
            }

            //high
            if (last_price < harga_wajar_40) {
                var status = "UNDERVALUED"
                // const persentase_kemurahan = ((harga_wajar_40/last_price)-1)*100
                const persentase_kemurahan = 10
                const undervalued = { "last_price": last_price, "harga_wajar": harga_wajar_40, "code_saham": code_saham, "persentase_kemurahan": parseInt(persentase_kemurahan), "status": status }
                undervalued_sum_40.push(undervalued)
            } else {
                var status = "OVERVALUED"
            }

            //high
            if (last_price < harga_wajar_50) {
                var status = "UNDERVALUED"
                // const persentase_kemurahan = ((harga_wajar_50/last_price)-1)*100
                const persentase_kemurahan = 10
                const undervalued = { "last_price": last_price, "harga_wajar": harga_wajar_50, "code_saham": code_saham, "persentase_kemurahan": parseInt(persentase_kemurahan), "status": status }
                undervalued_sum_50.push(undervalued)
            } else {
                var status = "OVERVALUED"
            }
        }
        // await Mail.send('undervalued', { undervalued_sum_10, undervalued_sum_20, undervalued_sum_30 }, (message) => {
        //     message.from('energen1995@gmail.com')
        //     message.to('fitrohgalih@gmail.com')
        //     message.subject('UNDERVALUED STOCK!')
        // })

        return view.render('analisis_all_emiten', { undervalued_sum_10, undervalued_sum_20, undervalued_sum_30, undervalued_sum_40, undervalued_sum_50 })
    }
    async analisisSingleEmitenFind({ request, view, response, auth }) {
        const kode_emiten = request.input('kode_emiten')
        const EPS_growth = request.input('eps_growth')

        const data_single = await yahooFinance.quote({
            symbol: kode_emiten,
            modules: ['price', 'earnings', 'financialData', 'defaultKeyStatistics']  // ex: ['price', 'summaryDetail']
        });
        const last_price = data_single.price.regularMarketPrice
        const EPS = data_single.defaultKeyStatistics.trailingEps

        const PER_non_growth_company = 7
        const eps_growth = parseInt(EPS_growth)
        const deposito_indo = 6.5
        const obligasi_indo = 11
        const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * deposito_indo) / obligasi_indo
        const harga_wajar_float = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
        const harga_wajar = parseInt(harga_wajar_float)
        const persentase_kemurahan_float = ((harga_wajar/last_price)-1)*100
        const persentase_kemurahan = parseInt(persentase_kemurahan_float)

        const data = { kode_emiten, EPS_growth, harga_wajar, last_price, EPS, persentase_kemurahan }


        return view.render('analisis_single_emiten', { data })


    }
    async home({ request, view, response, auth }) {
        return view.render('home')
    }
    async price({ request, view, response, auth }) {
        // const data = await si.getSingleStockInfo('MNCN.JK')
        // const data = yahoo.earningsGrowth('MNCN.JK')
        const data = await yahooFinance.quote({
            symbol: 'BMTR.JK',
            modules: ['price', 'earnings', 'financialData', 'defaultKeyStatistics']  // ex: ['price', 'summaryDetail']
        });
        return response.json({
            data
        })
        const code = [
            { "kode_saham": "AALI.JK" },
            { "kode_saham": "ACES.JK" },
            { "kode_saham": "ADHI.JK" },
            { "kode_saham": "ADRO.JK" },
            { "kode_saham": "AKRA.JK" },
            { "kode_saham": "ANTM.JK" },
            { "kode_saham": "APLN.JK" },
            { "kode_saham": "ASII.JK" },
            { "kode_saham": "ASSA.JK" },
            { "kode_saham": "BBCA.JK" },
            { "kode_saham": "BBNI.JK" },
            { "kode_saham": "BBRI.JK" },
            { "kode_saham": "BBTN.JK" },
            { "kode_saham": "BEST.JK" },
            { "kode_saham": "BJBR.JK" },
            { "kode_saham": "BJTM.JK" },
            { "kode_saham": "BKSL.JK" },
            { "kode_saham": "BMRI.JK" },
            { "kode_saham": "BMTR.JK" },
            { "kode_saham": "BNGA.JK" },
            { "kode_saham": "BNLI.JK" },
            { "kode_saham": "BOGA.JK" },
            { "kode_saham": "BRPT.JK" },
            { "kode_saham": "BSDE.JK" },
            { "kode_saham": "BTPS.JK" },
            { "kode_saham": "CLEO.JK" },
            { "kode_saham": "CPIN.JK" },
            { "kode_saham": "CTRA.JK" },
            { "kode_saham": "DMAS.JK" },
            { "kode_saham": "ELSA.JK" },
            { "kode_saham": "ERAA.JK" },
            { "kode_saham": "ESSA.JK" },
            { "kode_saham": "EXCL.JK" },
            { "kode_saham": "GGRM.JK" },
            { "kode_saham": "GIAA.JK" },
            { "kode_saham": "HMSP.JK" },
            { "kode_saham": "HOKI.JK" },
            { "kode_saham": "HRUM.JK" },
            { "kode_saham": "ICBP.JK" },
            { "kode_saham": "INCO.JK" },
            { "kode_saham": "INDF.JK" },
            { "kode_saham": "INDY.JK" },
            { "kode_saham": "INKP.JK" },
            { "kode_saham": "INTP.JK" },
            { "kode_saham": "ISAT.JK" },
            { "kode_saham": "ITMG.JK" },
            { "kode_saham": "JPFA.JK" },
            { "kode_saham": "JRPT.JK" },
            { "kode_saham": "JSMR.JK" },
            { "kode_saham": "KBLI.JK" },
            { "kode_saham": "KLBF.JK" },
            { "kode_saham": "LPKR.JK" },
            { "kode_saham": "LPPF.JK" },
            { "kode_saham": "LSIP.JK" },
            { "kode_saham": "MAIN.JK" },
            { "kode_saham": "MAPI.JK" },
            { "kode_saham": "MDKA.JK" },
            { "kode_saham": "MEDC.JK" },
            { "kode_saham": "MGRO.JK" },
            { "kode_saham": "MIKA.JK" },
            { "kode_saham": "MNCN.JK" },
            { "kode_saham": "MTDL.JK" },
            { "kode_saham": "MYOR.JK" },
            { "kode_saham": "PGAS.JK" },
            { "kode_saham": "PNBN.JK" },
            { "kode_saham": "PNLF.JK" },
            { "kode_saham": "PPRO.JK" },
            { "kode_saham": "PTBA.JK" },
            { "kode_saham": "PTPP.JK" },
            { "kode_saham": "PWON.JK" },
            { "kode_saham": "RALS.JK" },
            { "kode_saham": "SCMA.JK" },
            { "kode_saham": "SIDO.JK" },
            { "kode_saham": "SILO.JK" },
            { "kode_saham": "SMBR.JK" },
            { "kode_saham": "SMCB.JK" },
            { "kode_saham": "SMGR.JK" },
            { "kode_saham": "SMRA.JK" },
            { "kode_saham": "SMSM.JK" },
            { "kode_saham": "SPTO.JK" },
            { "kode_saham": "SRIL.JK" },
            { "kode_saham": "SSIA.JK" },
            { "kode_saham": "SSMS.JK" },
            { "kode_saham": "TBIG.JK" },
            { "kode_saham": "TDPM.JK" },
            { "kode_saham": "TELE.JK" },
            { "kode_saham": "TINS.JK" },
            { "kode_saham": "TKIM.JK" },
            { "kode_saham": "TLKM.JK" },
            { "kode_saham": "TOPS.JK" },
            { "kode_saham": "TOWR.JK" },
            { "kode_saham": "TPIA.JK" },
            { "kode_saham": "UNTR.JK" },
            { "kode_saham": "UNVR.JK" },
            { "kode_saham": "WEGE.JK" },
            { "kode_saham": "WIKA.JK" },
            { "kode_saham": "WOOD.JK" },
            { "kode_saham": "WSBP.JK" },
            { "kode_saham": "WSKT.JK" },
            { "kode_saham": "WTON.JK" },
        ]
        var sum = []
        let undervalued_sum_10 = []
        let undervalued_sum_20 = []
        let undervalued_sum_30 = []

        //asumsi eps growth 10% stabil
        function hrgWjr10(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 10
            const deposito_indo = 6.5
            const obligasi_indo = 11
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * deposito_indo) / obligasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return harga_wajar
        }
        //asumsi eps growth 20% stabil
        function hrgWjr20(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 20
            const deposito_indo = 6.5
            const obligasi_indo = 11
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * deposito_indo) / obligasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return harga_wajar
        }
        //asumsi eps growth 30% stabil
        function hrgWjr30(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 30
            const deposito_indo = 6.5
            const obligasi_indo = 11
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * deposito_indo) / obligasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return harga_wajar
        }
        for (var i = 0; i < code.length; i++) {
            const data = await si.getSingleStockInfo(code[i].kode_saham)
            const last_price = data.regularMarketPrice
            const code_saham = code[i].kode_saham
            const EPS = data.epsTrailingTwelveMonths

            //memanggil fungsi
            const harga_wajar_10 = hrgWjr10(EPS)
            const harga_wajar_20 = hrgWjr20(EPS)
            const harga_wajar_30 = hrgWjr30(EPS)

            //low
            if (last_price < harga_wajar_10) {
                var status = "UNDERVALUED"
                const undervalued = { "last_price": last_price, "harga_wajar": harga_wajar_10, "code_saham": code_saham, "status": status }
                undervalued_sum_10.push(undervalued)
            } else {
                var status = "OVERVALUED"
            }

            //medium
            if (last_price < harga_wajar_20) {
                var status = "UNDERVALUED"
                const undervalued = { "last_price": last_price, "harga_wajar": harga_wajar_20, "code_saham": code_saham, "status": status }
                undervalued_sum_20.push(undervalued)
            } else {
                var status = "OVERVALUED"
            }

            //high
            if (last_price < harga_wajar_30) {
                var status = "UNDERVALUED"
                const undervalued = { "last_price": last_price, "harga_wajar": harga_wajar_30, "code_saham": code_saham, "status": status }
                undervalued_sum_30.push(undervalued)
            } else {
                var status = "OVERVALUED"
            }

            // const obj = { "last_price": last_price, "harga_wajar": harga_wajar, "code_saham": code_saham, "status": status }
            // sum.push(obj)

        }
        await Mail.send('email_undervalued', { undervalued_sum_10, undervalued_sum_20, undervalued_sum_30 }, (message) => {
            message.from('energen1995@gmail.com')
            message.to('wafiqfadillah2000@gmail.com')
            message.subject('UNDERVALUED STOCK!')
        })

        return response.json({
            res: sum,
            under_low: undervalued_sum_10,
            under_medium: undervalued_sum_20,
            under_high: undervalued_sum_30
        })
    }
    async hrg({ request, view, response, auth }) {
        function hrg() {
            var i = 10
            var j = 12
            var obj = { i, j }
            return obj
        }
        const obj = hrg()
        return obj
    }
}

module.exports = SahamController





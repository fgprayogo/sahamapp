'use strict'
const Mail = use('Mail');
var yahooFinance = require('yahoo-finance');
var si = require('stock-info');
const axios = require('axios');
const Redis = use('Redis')

class SahamController {
    async analisisSingleEmiten({ request, view, response, auth }) {
        return view.render('analisis_single_emiten')
    }
    async analisisAllEmitenKompas100({ request, view, response, auth }) {
        const cachedUndervaluedSumKompas100 = await Redis.get('undervalued_sum_kompas100')
        if (cachedUndervaluedSumKompas100) {
            const cachedData = await JSON.parse(cachedUndervaluedSumKompas100)
            const {undervalued_sum_10, undervalued_sum_20, undervalued_sum_30, undervalued_sum_40, undervalued_sum_50} = cachedData
            const stat = "Cached"
            return view.render('analisis_all_emiten_kompas100', { undervalued_sum_10, undervalued_sum_20, undervalued_sum_30, undervalued_sum_40, undervalued_sum_50, stat })
          }
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
            { "kode_saham": "BBKP.JK" },
            { "kode_saham": "BBNI.JK" },
            { "kode_saham": "BBRI.JK" },
            { "kode_saham": "BBTN.JK" },
            { "kode_saham": "BDMN.JK" },
            { "kode_saham": "BEST.JK" },
            { "kode_saham": "BJBR.JK" },
            { "kode_saham": "BJTM.JK" },
            { "kode_saham": "BMRI.JK" },
            { "kode_saham": "BMTR.JK" },
            { "kode_saham": "BNLI.JK" },
            { "kode_saham": "BRIS.JK" },
            { "kode_saham": "BRPT.JK" },
            { "kode_saham": "BSDE.JK" },
            { "kode_saham": "BTPS.JK" },
            { "kode_saham": "BULL.JK" },
            { "kode_saham": "CLEO.JK" },
            { "kode_saham": "CPIN.JK" },
            { "kode_saham": "CTRA.JK" },
            { "kode_saham": "DMAS.JK" },
            { "kode_saham": "ELSA.JK" },
            { "kode_saham": "ERAA.JK" },
            { "kode_saham": "EXCL.JK" },
            { "kode_saham": "GGRM.JK" },
            { "kode_saham": "GIAA.JK" },
            { "kode_saham": "HKMU.JK" },
            { "kode_saham": "HMSP.JK" },
            { "kode_saham": "HOKI.JK" },
            { "kode_saham": "ICBP.JK" },
            { "kode_saham": "INAF.JK" },
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
            { "kode_saham": "KAEF.JK" },
            { "kode_saham": "KBLI.JK" },
            { "kode_saham": "KINO.JK" },
            { "kode_saham": "KLBF.JK" },
            { "kode_saham": "LINK.JK" },
            { "kode_saham": "LPKR.JK" },
            { "kode_saham": "LPPF.JK" },
            { "kode_saham": "LSIP.JK" },
            { "kode_saham": "MAIN.JK" },
            { "kode_saham": "MAPI.JK" },
            { "kode_saham": "MDKA.JK" },
            { "kode_saham": "MEDC.JK" },
            { "kode_saham": "MIKA.JK" },
            { "kode_saham": "MNCN.JK" },
            { "kode_saham": "MTDL.JK" },
            { "kode_saham": "MYOR.JK" },
            { "kode_saham": "PGAS.JK" },
            { "kode_saham": "PNBN.JK" },
            { "kode_saham": "PNLF.JK" },
            { "kode_saham": "PSAB.JK" },
            { "kode_saham": "PTBA.JK" },
            { "kode_saham": "PTPP.JK" },
            { "kode_saham": "PWON.JK" },
            { "kode_saham": "RALS.JK" },
            { "kode_saham": "SCMA.JK" },
            { "kode_saham": "SIDO.JK" },
            { "kode_saham": "SILO.JK" },
            { "kode_saham": "SIMP.JK" },
            { "kode_saham": "SMBR.JK" },
            { "kode_saham": "SMGR.JK" },
            { "kode_saham": "SMRA.JK" },
            { "kode_saham": "SMSM.JK" },
            { "kode_saham": "SPTO.JK" },
            { "kode_saham": "SRIL.JK" },
            { "kode_saham": "SSIA.JK" },
            { "kode_saham": "SSMS.JK" },
            { "kode_saham": "TBIG.JK" },
            { "kode_saham": "TINS.JK" },
            { "kode_saham": "TKIM.JK" },
            { "kode_saham": "TLKM.JK" },
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
        let undervalued_sum_10 = []
        let undervalued_sum_20 = []
        let undervalued_sum_30 = []
        let undervalued_sum_40 = []
        let undervalued_sum_50 = []

        var obligasi_pemerintah_indo = 6
        var obligasi_korporasi_indo = 8

        //asumsi eps growth 10% stabil
        function hrgWjr10(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 10
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * obligasi_pemerintah_indo) / obligasi_korporasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return parseInt(harga_wajar)
        }
        //asumsi eps growth 20% stabil
        function hrgWjr20(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 20
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * obligasi_pemerintah_indo) / obligasi_korporasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return parseInt(harga_wajar)
        }
        //asumsi eps growth 30% stabil
        function hrgWjr30(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 30
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * obligasi_pemerintah_indo) / obligasi_korporasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return parseInt(harga_wajar)
        }
        //asumsi eps growth 40% stabil
        function hrgWjr40(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 40
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * obligasi_pemerintah_indo) / obligasi_korporasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return parseInt(harga_wajar)
        }
        //asumsi eps growth 50% stabil
        function hrgWjr50(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 50
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * obligasi_pemerintah_indo) / obligasi_korporasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return parseInt(harga_wajar)
        }
        for (var i = 0; i < code.length; i++) {
            const data = await yahooFinance.quote({
                symbol: code[i].kode_saham,
                modules: ['price', 'earnings', 'financialData', 'defaultKeyStatistics']  // ex: ['price', 'summaryDetail']
            });
            // if(!data.price || !data.price.regularMarketPrice || !data.defaultKeyStatistics || !data.defaultKeyStatistics.trailingEps){
            //     break
            // }
            // console.log(data.price.symbol)
            const last_price = data.price.regularMarketPrice
            const EPS = data.defaultKeyStatistics.trailingEps
            // const DER = data.financialData.debtToEquity

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
                const persentase_kemurahan = ((harga_wajar_10 / last_price) - 1) * 100
                // const persentase_kemurahan = 10
                const undervalued = { "last_price": last_price, "harga_wajar": harga_wajar_10, "code_saham": code_saham, "persentase_kemurahan": parseInt(persentase_kemurahan), "status": status }
                undervalued_sum_10.push(undervalued)
            } else {
                var status = "OVERVALUED"
            }

            //medium
            if (last_price < harga_wajar_20) {
                var status = "UNDERVALUED"
                const persentase_kemurahan = ((harga_wajar_20 / last_price) - 1) * 100
                // const persentase_kemurahan = 10
                const undervalued = { "last_price": last_price, "harga_wajar": harga_wajar_20, "code_saham": code_saham, "persentase_kemurahan": parseInt(persentase_kemurahan), "status": status }
                undervalued_sum_20.push(undervalued)
            } else {
                var status = "OVERVALUED"
            }

            //high
            if (last_price < harga_wajar_30) {
                var status = "UNDERVALUED"
                const persentase_kemurahan = ((harga_wajar_30 / last_price) - 1) * 100
                // const persentase_kemurahan = 10
                const undervalued = { "last_price": last_price, "harga_wajar": harga_wajar_30, "code_saham": code_saham, "persentase_kemurahan": parseInt(persentase_kemurahan), "status": status }
                undervalued_sum_30.push(undervalued)
            } else {
                var status = "OVERVALUED"
            }

            //high
            if (last_price < harga_wajar_40) {
                var status = "UNDERVALUED"
                const persentase_kemurahan = ((harga_wajar_40 / last_price) - 1) * 100
                // const persentase_kemurahan = 10
                const undervalued = { "last_price": last_price, "harga_wajar": harga_wajar_40, "code_saham": code_saham, "persentase_kemurahan": parseInt(persentase_kemurahan), "status": status }
                undervalued_sum_40.push(undervalued)
            } else {
                var status = "OVERVALUED"
            }

            //high
            if (last_price < harga_wajar_50) {
                var status = "UNDERVALUED"
                const persentase_kemurahan = ((harga_wajar_50 / last_price) - 1) * 100
                // const persentase_kemurahan = 10
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

        var undervalued_sum_kompas100 = {undervalued_sum_10, undervalued_sum_20, undervalued_sum_30, undervalued_sum_40, undervalued_sum_50}
        await Redis.set('undervalued_sum_kompas100', JSON.stringify(undervalued_sum_kompas100))
        Redis.expire('undervalued_sum_kompas100', 3600)
        const stat = "Not Cached"
        return view.render('analisis_all_emiten_kompas100', { undervalued_sum_10, undervalued_sum_20, undervalued_sum_30, undervalued_sum_40, undervalued_sum_50, stat })
    }
    async analisisAllEmitenAJ({ request, view, response, auth }) {
        const cachedUndervaluedSumAllEmitenAJ = await Redis.get('undervalued_sum_all_emiten_aj')
        if (cachedUndervaluedSumAllEmitenAJ) {
            const cachedData = await JSON.parse(cachedUndervaluedSumAllEmitenAJ)
            const {undervalued_sum_10, undervalued_sum_20, undervalued_sum_30, undervalued_sum_40, undervalued_sum_50} = cachedData
            const stat = "Cached"
            return view.render('analisis_all_emiten_aj', { undervalued_sum_10, undervalued_sum_20, undervalued_sum_30, undervalued_sum_40, undervalued_sum_50, stat })
          }
        const code = [
            { "kode_saham": "AALI.JK" },
            { "kode_saham": "ABBA.JK" },
            { "kode_saham": "ABDA.JK" },
            { "kode_saham": "ABMM.JK" },
            { "kode_saham": "ACES.JK" },
            { "kode_saham": "ACST.JK" },
            { "kode_saham": "ADES.JK" },
            { "kode_saham": "ADHI.JK" },
            { "kode_saham": "ADMF.JK" },
            { "kode_saham": "ADMG.JK" },
            { "kode_saham": "ADRO.JK" },
            { "kode_saham": "AGII.JK" },
            { "kode_saham": "AGRO.JK" },
            { "kode_saham": "AGRS.JK" },
            { "kode_saham": "AHAP.JK" },
            { "kode_saham": "AIMS.JK" },
            { "kode_saham": "AISA.JK" },
            { "kode_saham": "AKKU.JK" },
            { "kode_saham": "AKPI.JK" },
            { "kode_saham": "AKRA.JK" },
            { "kode_saham": "AKSI.JK" },
            { "kode_saham": "ALDO.JK" },
            { "kode_saham": "ALKA.JK" },
            { "kode_saham": "ALMI.JK" },
            { "kode_saham": "ALTO.JK" },
            { "kode_saham": "AMAG.JK" },
            { "kode_saham": "AMFG.JK" },
            { "kode_saham": "AMIN.JK" },
            { "kode_saham": "AMRT.JK" },
            { "kode_saham": "ANDI.JK" },
            { "kode_saham": "ANJT.JK" },
            { "kode_saham": "ANTM.JK" },
            { "kode_saham": "APEX.JK" },
            { "kode_saham": "APIC.JK" },
            { "kode_saham": "APII.JK" },
            { "kode_saham": "APLI.JK" },
            { "kode_saham": "APLN.JK" },
            { "kode_saham": "ARGO.JK" },
            { "kode_saham": "ARII.JK" },
            { "kode_saham": "ARKA.JK" },
            { "kode_saham": "ARMY.JK" },
            { "kode_saham": "ARNA.JK" },
            { "kode_saham": "ARTA.JK" },
            { "kode_saham": "ARTI.JK" },
            { "kode_saham": "ARTO.JK" },
            { "kode_saham": "ASBI.JK" },
            { "kode_saham": "ASDM.JK" },
            { "kode_saham": "ASGR.JK" },
            { "kode_saham": "ASII.JK" },
            { "kode_saham": "ASJT.JK" },
            { "kode_saham": "ASMI.JK" },
            { "kode_saham": "ASRI.JK" },
            { "kode_saham": "ASRM.JK" },
            { "kode_saham": "ASSA.JK" },
            { "kode_saham": "ATIC.JK" },
            { "kode_saham": "AUTO.JK" },
            { "kode_saham": "BABP.JK" },
            { "kode_saham": "BACA.JK" },
            { "kode_saham": "BAJA.JK" },
            { "kode_saham": "BALI.JK" },
            { "kode_saham": "BAPA.JK" },
            { "kode_saham": "BAPI.JK" },
            { "kode_saham": "BATA.JK" },
            { "kode_saham": "BAYU.JK" },
            { "kode_saham": "BBCA.JK" },
            { "kode_saham": "BBHI.JK" },
            { "kode_saham": "BBKP.JK" },
            { "kode_saham": "BBLD.JK" },
            { "kode_saham": "BBMD.JK" },
            { "kode_saham": "BBNI.JK" },
            { "kode_saham": "BBRI.JK" },
            { "kode_saham": "BBRM.JK" },
            { "kode_saham": "BBTN.JK" },
            { "kode_saham": "BBYB.JK" },
            { "kode_saham": "BCAP.JK" },
            { "kode_saham": "BCIP.JK" },
            { "kode_saham": "BDMN.JK" },
            { "kode_saham": "BEEF.JK" },
            { "kode_saham": "BEKS.JK" },
            { "kode_saham": "BELL.JK" },
            { "kode_saham": "BEST.JK" },
            { "kode_saham": "BFIN.JK" },
            { "kode_saham": "BGTG.JK" },
            { "kode_saham": "BHIT.JK" },
            { "kode_saham": "BIKA.JK" },
            { "kode_saham": "BIMA.JK" },
            { "kode_saham": "BINA.JK" },
            { "kode_saham": "BIPI.JK" },
            { "kode_saham": "BIPP.JK" },
            { "kode_saham": "BIRD.JK" },
            { "kode_saham": "BISI.JK" },
            { "kode_saham": "BJBR.JK" },
            { "kode_saham": "BJTM.JK" },
            { "kode_saham": "BKDP.JK" },
            { "kode_saham": "BKSL.JK" },
            { "kode_saham": "BKSW.JK" },
            { "kode_saham": "BLTZ.JK" },
            { "kode_saham": "BLUE.JK" },
            { "kode_saham": "BMAS.JK" },
            { "kode_saham": "BMRI.JK" },
            { "kode_saham": "BMSR.JK" },
            { "kode_saham": "BMTR.JK" },
            { "kode_saham": "BNBA.JK" },
            { "kode_saham": "BNBR.JK" },
            { "kode_saham": "BNGA.JK" },
            { "kode_saham": "BNII.JK" },
            { "kode_saham": "BNLI.JK" },
            { "kode_saham": "BOGA.JK" },
            { "kode_saham": "BOLA.JK" },
            { "kode_saham": "BOLT.JK" },
            { "kode_saham": "BOSS.JK" },
            { "kode_saham": "BPFI.JK" },
            { "kode_saham": "BPII.JK" },
            { "kode_saham": "BPTR.JK" },
            { "kode_saham": "BRAM.JK" },
            { "kode_saham": "BRIS.JK" },
            { "kode_saham": "BRNA.JK" },
            { "kode_saham": "BSDE.JK" },
            { "kode_saham": "BSIM.JK" },
            { "kode_saham": "BSSR.JK" },
            { "kode_saham": "BTEK.JK" },
            { "kode_saham": "BTEL.JK" },
            { "kode_saham": "BTON.JK" },
            { "kode_saham": "BTPN.JK" },
            { "kode_saham": "BTPS.JK" },
            { "kode_saham": "BUDI.JK" },
            { "kode_saham": "BUKK.JK" },
            { "kode_saham": "BULL.JK" },
            { "kode_saham": "BUMI.JK" },
            { "kode_saham": "BUVA.JK" },
            { "kode_saham": "BVIC.JK" },
            { "kode_saham": "BWPT.JK" },
            { "kode_saham": "BYAN.JK" },
            { "kode_saham": "CAKK.JK" },
            { "kode_saham": "CAMP.JK" },
            { "kode_saham": "CANI.JK" },
            { "kode_saham": "CARS.JK" },
            { "kode_saham": "CASA.JK" },
            { "kode_saham": "CASS.JK" },
            { "kode_saham": "CCSI.JK" },
            { "kode_saham": "CEKA.JK" },
            { "kode_saham": "CENT.JK" },
            { "kode_saham": "CFIN.JK" },
            { "kode_saham": "CINT.JK" },
            { "kode_saham": "CITA.JK" },
            { "kode_saham": "CITY.JK" },
            { "kode_saham": "CLAY.JK" },
            { "kode_saham": "CLEO.JK" },
            { "kode_saham": "CLPI.JK" },
            { "kode_saham": "CMNP.JK" },
            { "kode_saham": "CNKO.JK" },
            { "kode_saham": "CNTX.JK" },
            { "kode_saham": "COCO.JK" },
            { "kode_saham": "COWL.JK" },
            { "kode_saham": "CPIN.JK" },
            { "kode_saham": "CPRI.JK" },
            { "kode_saham": "CPRO.JK" },
            { "kode_saham": "CSAP.JK" },
            { "kode_saham": "CSIS.JK" },
            { "kode_saham": "CTBN.JK" },
            { "kode_saham": "CTRA.JK" },
            { "kode_saham": "CTTH.JK" },
            { "kode_saham": "DART.JK" },
            { "kode_saham": "DAYA.JK" },
            { "kode_saham": "DEAL.JK" },
            { "kode_saham": "DFAM.JK" },
            { "kode_saham": "DGIK.JK" },
            { "kode_saham": "DIGI.JK" },
            { "kode_saham": "DILD.JK" },
            { "kode_saham": "DIVA.JK" },
            { "kode_saham": "DKFT.JK" },
            { "kode_saham": "DLTA.JK" },
            { "kode_saham": "DMAS.JK" },
            { "kode_saham": "DMMX.JK" },
            { "kode_saham": "DNAR.JK" },
            { "kode_saham": "DNET.JK" },
            { "kode_saham": "DOID.JK" },
            { "kode_saham": "DPNS.JK" },
            { "kode_saham": "DPUM.JK" },
            { "kode_saham": "DSFI.JK" },
            { "kode_saham": "DSNG.JK" },
            { "kode_saham": "DSSA.JK" },
            { "kode_saham": "DUCK.JK" },
            { "kode_saham": "DUTI.JK" },
            { "kode_saham": "DVLA.JK" },
            { "kode_saham": "DWGL.JK" },
            { "kode_saham": "DYAN.JK" },
            { "kode_saham": "EAST.JK" },
            { "kode_saham": "ECII.JK" },
            { "kode_saham": "EKAD.JK" },
            { "kode_saham": "ELSA.JK" },
            { "kode_saham": "ELTY.JK" },
            { "kode_saham": "EMDE.JK" },
            { "kode_saham": "EMTK.JK" },
            { "kode_saham": "ENRG.JK" },
            { "kode_saham": "ENVY.JK" },
            { "kode_saham": "EPMT.JK" },
            { "kode_saham": "ERAA.JK" },
            { "kode_saham": "ESIP.JK" },
            { "kode_saham": "ESSA.JK" },
            { "kode_saham": "ESTI.JK" },
            { "kode_saham": "ETWA.JK" },
            { "kode_saham": "EXCL.JK" },
            { "kode_saham": "FAST.JK" },
            { "kode_saham": "FASW.JK" },
            { "kode_saham": "FILM.JK" },
            { "kode_saham": "FINN.JK" },
            { "kode_saham": "FIRE.JK" },
            { "kode_saham": "FISH.JK" },
            { "kode_saham": "FITT.JK" },
            { "kode_saham": "FMII.JK" },
            { "kode_saham": "FOOD.JK" },
            { "kode_saham": "FORU.JK" },
            { "kode_saham": "FORZ.JK" },
            { "kode_saham": "FREN.JK" },
            { "kode_saham": "FUJI.JK" },
            { "kode_saham": "GAMA.JK" },
            { "kode_saham": "GDST.JK" },
            { "kode_saham": "GDYR.JK" },
            { "kode_saham": "GEMA.JK" },
            { "kode_saham": "GGRM.JK" },
            { "kode_saham": "GGRP.JK" },
            { "kode_saham": "GHON.JK" },
            { "kode_saham": "GIAA.JK" },
            { "kode_saham": "GJTL.JK" },
            { "kode_saham": "GLOB.JK" },
            { "kode_saham": "GMFI.JK" },
            { "kode_saham": "GMTD.JK" },
            { "kode_saham": "GOLD.JK" },
            { "kode_saham": "GOLL.JK" },
            { "kode_saham": "GOOD.JK" },
            { "kode_saham": "GPRA.JK" },
            { "kode_saham": "GSMF.JK" },
            { "kode_saham": "GTBO.JK" },
            { "kode_saham": "GWSA.JK" },
            { "kode_saham": "GZCO.JK" },
            { "kode_saham": "HADE.JK" },
            { "kode_saham": "HDFA.JK" },
            { "kode_saham": "HDIT.JK" },
            { "kode_saham": "HEAL.JK" },
            { "kode_saham": "HELI.JK" },
            { "kode_saham": "HERO.JK" },
            { "kode_saham": "HEXA.JK" },
            { "kode_saham": "HITS.JK" },
            { "kode_saham": "HKMU.JK" },
            { "kode_saham": "HMSP.JK" },
            { "kode_saham": "HOKI.JK" },
            { "kode_saham": "HOME.JK" },
            { "kode_saham": "HOTL.JK" },
            { "kode_saham": "HRME.JK" },
            { "kode_saham": "HRTA.JK" },
            { "kode_saham": "HRUM.JK" },
            { "kode_saham": "IBFN.JK" },
            { "kode_saham": "IBST.JK" },
            { "kode_saham": "ICBP.JK" },
            { "kode_saham": "ICON.JK" },
            { "kode_saham": "IDPR.JK" },
            { "kode_saham": "IGAR.JK" },
            { "kode_saham": "IIKP.JK" },
            { "kode_saham": "IKAI.JK" },
            { "kode_saham": "IKBI.JK" },
            { "kode_saham": "IMAS.JK" },
            { "kode_saham": "IMJS.JK" },
            { "kode_saham": "IMPC.JK" },
            { "kode_saham": "INAF.JK" },
            { "kode_saham": "INAI.JK" },
            { "kode_saham": "INCF.JK" },
            { "kode_saham": "INCI.JK" },
            { "kode_saham": "INCO.JK" },
            { "kode_saham": "INDF.JK" },
            { "kode_saham": "INDR.JK" },
            { "kode_saham": "INDS.JK" },
            { "kode_saham": "INDX.JK" },
            { "kode_saham": "INDY.JK" },
            { "kode_saham": "INKP.JK" },
            { "kode_saham": "INOV.JK" },
            { "kode_saham": "INPC.JK" },
            { "kode_saham": "INPP.JK" },
            { "kode_saham": "INPS.JK" },
            { "kode_saham": "INRU.JK" },
            { "kode_saham": "INTA.JK" },
            { "kode_saham": "INTD.JK" },
            { "kode_saham": "INTP.JK" },
            { "kode_saham": "IPCC.JK" },
            { "kode_saham": "IPCM.JK" },
            { "kode_saham": "IPOL.JK" },
            { "kode_saham": "IPTV.JK" },
            { "kode_saham": "IRRA.JK" },
            { "kode_saham": "ISAT.JK" },
            { "kode_saham": "ISSP.JK" },
            { "kode_saham": "ITIC.JK" },
            { "kode_saham": "ITMA.JK" },
            { "kode_saham": "ITMG.JK" },
            { "kode_saham": "JAST.JK" },
            { "kode_saham": "JAWA.JK" },
            { "kode_saham": "JAYA.JK" },
            { "kode_saham": "JECC.JK" },
            { "kode_saham": "JGLE.JK" },
            { "kode_saham": "JIHD.JK" },
            { "kode_saham": "JKON.JK" },
            { "kode_saham": "JKSW.JK" },
            { "kode_saham": "JMAS.JK" },
            { "kode_saham": "JPFA.JK" },
            { "kode_saham": "JRPT.JK" },
            { "kode_saham": "JSKY.JK" },
            { "kode_saham": "JSMR.JK" },
            { "kode_saham": "JSPT.JK" },
            { "kode_saham": "JTPE.JK" },

        ]
        let undervalued_sum_10 = []
        let undervalued_sum_20 = []
        let undervalued_sum_30 = []
        let undervalued_sum_40 = []
        let undervalued_sum_50 = []

        var obligasi_pemerintah_indo = 6
        var obligasi_korporasi_indo = 8

        //asumsi eps growth 10% stabil
        function hrgWjr10(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 10
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * obligasi_pemerintah_indo) / obligasi_korporasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return parseInt(harga_wajar)
        }
        //asumsi eps growth 20% stabil
        function hrgWjr20(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 20
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * obligasi_pemerintah_indo) / obligasi_korporasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return parseInt(harga_wajar)
        }
        //asumsi eps growth 30% stabil
        function hrgWjr30(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 30
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * obligasi_pemerintah_indo) / obligasi_korporasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return parseInt(harga_wajar)
        }
        //asumsi eps growth 40% stabil
        function hrgWjr40(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 40
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * obligasi_pemerintah_indo) / obligasi_korporasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return parseInt(harga_wajar)
        }
        //asumsi eps growth 50% stabil
        function hrgWjr50(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 50
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * obligasi_pemerintah_indo) / obligasi_korporasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return parseInt(harga_wajar)
        }
        for (var i = 0; i < code.length; i++) {
            const data = await yahooFinance.quote({
                symbol: code[i].kode_saham,
                modules: ['price', 'earnings', 'financialData', 'defaultKeyStatistics']  // ex: ['price', 'summaryDetail']
            });
            // if(!data.price || !data.price.regularMarketPrice || !data.defaultKeyStatistics || !data.defaultKeyStatistics.trailingEps){
            //     break
            // }
            // console.log(data.price.symbol)
            const last_price = data.price.regularMarketPrice
            const EPS = data.defaultKeyStatistics.trailingEps
            // const DER = data.financialData.debtToEquity

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
                const persentase_kemurahan = ((harga_wajar_10 / last_price) - 1) * 100
                // const persentase_kemurahan = 10
                const undervalued = { "last_price": last_price, "harga_wajar": harga_wajar_10, "code_saham": code_saham, "persentase_kemurahan": parseInt(persentase_kemurahan), "status": status }
                undervalued_sum_10.push(undervalued)
            } else {
                var status = "OVERVALUED"
            }

            //medium
            if (last_price < harga_wajar_20) {
                var status = "UNDERVALUED"
                const persentase_kemurahan = ((harga_wajar_20 / last_price) - 1) * 100
                // const persentase_kemurahan = 10
                const undervalued = { "last_price": last_price, "harga_wajar": harga_wajar_20, "code_saham": code_saham, "persentase_kemurahan": parseInt(persentase_kemurahan), "status": status }
                undervalued_sum_20.push(undervalued)
            } else {
                var status = "OVERVALUED"
            }

            //high
            if (last_price < harga_wajar_30) {
                var status = "UNDERVALUED"
                const persentase_kemurahan = ((harga_wajar_30 / last_price) - 1) * 100
                // const persentase_kemurahan = 10
                const undervalued = { "last_price": last_price, "harga_wajar": harga_wajar_30, "code_saham": code_saham, "persentase_kemurahan": parseInt(persentase_kemurahan), "status": status }
                undervalued_sum_30.push(undervalued)
            } else {
                var status = "OVERVALUED"
            }

            //high
            if (last_price < harga_wajar_40) {
                var status = "UNDERVALUED"
                const persentase_kemurahan = ((harga_wajar_40 / last_price) - 1) * 100
                // const persentase_kemurahan = 10
                const undervalued = { "last_price": last_price, "harga_wajar": harga_wajar_40, "code_saham": code_saham, "persentase_kemurahan": parseInt(persentase_kemurahan), "status": status }
                undervalued_sum_40.push(undervalued)
            } else {
                var status = "OVERVALUED"
            }

            //high
            if (last_price < harga_wajar_50) {
                var status = "UNDERVALUED"
                const persentase_kemurahan = ((harga_wajar_50 / last_price) - 1) * 100
                // const persentase_kemurahan = 10
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

        var undervalued_sum_all_emiten_aj = {undervalued_sum_10, undervalued_sum_20, undervalued_sum_30, undervalued_sum_40, undervalued_sum_50}
        await Redis.set('undervalued_sum_all_emiten_aj', JSON.stringify(undervalued_sum_all_emiten_aj))
        Redis.expire('undervalued_sum_all_emiten_aj', 3600)
        const stat = "Not Cached"
        return view.render('analisis_all_emiten_aj', { undervalued_sum_10, undervalued_sum_20, undervalued_sum_30, undervalued_sum_40, undervalued_sum_50 })
    }
    async analisisAllEmitenKZ({ request, view, response, auth }) {
        const cachedUndervaluedSumAllEmitenKZ = await Redis.get('undervalued_sum_all_emiten_kz')
        if (cachedUndervaluedSumAllEmitenKZ) {
            const cachedData = await JSON.parse(cachedUndervaluedSumAllEmitenKZ)
            const {undervalued_sum_10, undervalued_sum_20, undervalued_sum_30, undervalued_sum_40, undervalued_sum_50} = cachedData
            const stat = "Cached"
            return view.render('analisis_all_emiten_kz', { undervalued_sum_10, undervalued_sum_20, undervalued_sum_30, undervalued_sum_40, undervalued_sum_50, stat })
          }
        const code = [
            { "kode_saham": "KAEF.JK" },
            { "kode_saham": "KAYU.JK" },
            { "kode_saham": "KBLI.JK" },
            { "kode_saham": "KBLM.JK" },
            { "kode_saham": "KBLV.JK" },
            { "kode_saham": "KBRI.JK" },
            { "kode_saham": "KDSI.JK" },
            { "kode_saham": "KEEN.JK" },
            { "kode_saham": "KEJU.JK" },
            { "kode_saham": "KIAS.JK" },
            { "kode_saham": "KICI.JK" },
            { "kode_saham": "KIJA.JK" },
            { "kode_saham": "KINO.JK" },
            { "kode_saham": "KIOS.JK" },
            { "kode_saham": "KJEN.JK" },
            { "kode_saham": "KKGI.JK" },
            { "kode_saham": "KLBF.JK" },
            { "kode_saham": "KMTR.JK" },
            { "kode_saham": "KOBX.JK" },
            { "kode_saham": "KOIN.JK" },
            { "kode_saham": "KONI.JK" },
            { "kode_saham": "KOPI.JK" },
            { "kode_saham": "KOTA.JK" },
            { "kode_saham": "KPAL.JK" },
            { "kode_saham": "KPAS.JK" },
            { "kode_saham": "KPIG.JK" },
            { "kode_saham": "KRAH.JK" },
            { "kode_saham": "KRAS.JK" },
            { "kode_saham": "KREN.JK" },
            { "kode_saham": "LAND.JK" },
            { "kode_saham": "LAPD.JK" },
            { "kode_saham": "LCGP.JK" },
            { "kode_saham": "LCKM.JK" },
            { "kode_saham": "LEAD.JK" },
            { "kode_saham": "LIFE.JK" },
            { "kode_saham": "LINK.JK" },
            { "kode_saham": "LION.JK" },
            { "kode_saham": "LMAS.JK" },
            { "kode_saham": "LMPI.JK" },
            { "kode_saham": "LMSH.JK" },
            { "kode_saham": "LPCK.JK" },
            { "kode_saham": "LPGI.JK" },
            { "kode_saham": "LPIN.JK" },
            { "kode_saham": "LPKR.JK" },
            { "kode_saham": "LPLI.JK" },
            { "kode_saham": "LPPF.JK" },
            { "kode_saham": "LPPS.JK" },
            { "kode_saham": "LRNA.JK" },
            { "kode_saham": "LSIP.JK" },
            { "kode_saham": "LTLS.JK" },
            { "kode_saham": "LUCK.JK" },
            { "kode_saham": "MABA.JK" },
            { "kode_saham": "MAGP.JK" },
            { "kode_saham": "MAIN.JK" },
            { "kode_saham": "MAMI.JK" },
            { "kode_saham": "MAPA.JK" },
            { "kode_saham": "MAPB.JK" },
            { "kode_saham": "MAPI.JK" },
            { "kode_saham": "MARI.JK" },
            { "kode_saham": "MARK.JK" },
            { "kode_saham": "MASA.JK" },
            { "kode_saham": "MAYA.JK" },
            { "kode_saham": "MBAP.JK" },
            { "kode_saham": "MBSS.JK" },
            { "kode_saham": "MBTO.JK" },
            { "kode_saham": "MCAS.JK" },
            { "kode_saham": "MCOR.JK" },
            { "kode_saham": "MDIA.JK" },
            { "kode_saham": "MDKA.JK" },
            { "kode_saham": "MDKI.JK" },
            { "kode_saham": "MDLN.JK" },
            { "kode_saham": "MDRN.JK" },
            { "kode_saham": "MEDC.JK" },
            { "kode_saham": "MEGA.JK" },
            { "kode_saham": "MERK.JK" },
            { "kode_saham": "META.JK" },
            { "kode_saham": "MFIN.JK" },
            { "kode_saham": "MFMI.JK" },
            { "kode_saham": "MGNA.JK" },
            { "kode_saham": "MGRO.JK" },
            { "kode_saham": "MICE.JK" },
            { "kode_saham": "MIDI.JK" },
            { "kode_saham": "MIKA.JK" },
            { "kode_saham": "MINA.JK" },
            { "kode_saham": "MIRA.JK" },
            { "kode_saham": "MKNT.JK" },
            { "kode_saham": "MKPI.JK" },
            { "kode_saham": "MLBI.JK" },
            { "kode_saham": "MLIA.JK" },
            { "kode_saham": "MLPL.JK" },
            { "kode_saham": "MLPT.JK" },
            { "kode_saham": "MMLP.JK" },
            { "kode_saham": "MNCN.JK" },
            { "kode_saham": "MOLI.JK" },
            { "kode_saham": "MPMX.JK" },
            { "kode_saham": "MPOW.JK" },
            { "kode_saham": "MPPA.JK" },
            { "kode_saham": "MPRO.JK" },
            { "kode_saham": "MRAT.JK" },
            { "kode_saham": "MREI.JK" },
            { "kode_saham": "MSIN.JK" },
            { "kode_saham": "MSKY.JK" },
            { "kode_saham": "MTDL.JK" },
            { "kode_saham": "MTFN.JK" },
            { "kode_saham": "MTLA.JK" },
            { "kode_saham": "MTPS.JK" },
            { "kode_saham": "MTRA.JK" },
            { "kode_saham": "MTSM.JK" },
            { "kode_saham": "MTWI.JK" },
            { "kode_saham": "MYOH.JK" },
            { "kode_saham": "MYOR.JK" },
            { "kode_saham": "MYRX.JK" },
            { "kode_saham": "MYTX.JK" },
            { "kode_saham": "NASA.JK" },
            { "kode_saham": "NATO.JK" },
            { "kode_saham": "NELY.JK" },
            { "kode_saham": "NFCX.JK" },
            { "kode_saham": "NICK.JK" },
            { "kode_saham": "NIRO.JK" },
            { "kode_saham": "NISP.JK" },
            { "kode_saham": "NOBU.JK" },
            { "kode_saham": "NRCA.JK" },
            { "kode_saham": "NUSA.JK" },
            { "kode_saham": "NZIA.JK" },
            { "kode_saham": "OASA.JK" },
            { "kode_saham": "OCAP.JK" },
            { "kode_saham": "OKAS.JK" },
            { "kode_saham": "OMRE.JK" },
            { "kode_saham": "OPMS.JK" },
            { "kode_saham": "PADI.JK" },
            { "kode_saham": "PALM.JK" },
            { "kode_saham": "PAMG.JK" },
            { "kode_saham": "PANI.JK" },
            { "kode_saham": "PANR.JK" },
            { "kode_saham": "PANS.JK" },
            { "kode_saham": "PBID.JK" },
            { "kode_saham": "PBRX.JK" },
            { "kode_saham": "PBSA.JK" },
            { "kode_saham": "PCAR.JK" },
            { "kode_saham": "PDES.JK" },
            { "kode_saham": "PEGE.JK" },
            { "kode_saham": "PEHA.JK" },
            { "kode_saham": "PGLI.JK" },
            { "kode_saham": "PICO.JK" },
            { "kode_saham": "PJAA.JK" },
            { "kode_saham": "PLIN.JK" },
            { "kode_saham": "PNBN.JK" },
            { "kode_saham": "PNBS.JK" },
            { "kode_saham": "PNIN.JK" },
            { "kode_saham": "PNLF.JK" },
            { "kode_saham": "PNSE.JK" },
            { "kode_saham": "POLA.JK" },
            { "kode_saham": "POLI.JK" },
            { "kode_saham": "POLL.JK" },
            { "kode_saham": "POLU.JK" },
            { "kode_saham": "POLY.JK" },
            { "kode_saham": "POOL.JK" },
            { "kode_saham": "PORT.JK" },
            { "kode_saham": "POSA.JK" },
            { "kode_saham": "POWR.JK" },
            { "kode_saham": "PPRE.JK" },
            { "kode_saham": "PPRO.JK" },
            { "kode_saham": "PRAS.JK" },
            { "kode_saham": "PRDA.JK" },
            { "kode_saham": "PRIM.JK" },
            { "kode_saham": "PSDN.JK" },
            { "kode_saham": "PSGO.JK" },
            { "kode_saham": "PSKT.JK" },
            { "kode_saham": "PSSI.JK" },
            { "kode_saham": "PTBA.JK" },
            { "kode_saham": "PTPP.JK" },
            { "kode_saham": "PTRO.JK" },
            { "kode_saham": "PTSN.JK" },
            { "kode_saham": "PTSP.JK" },
            { "kode_saham": "PUDP.JK" },
            { "kode_saham": "PURE.JK" },
            { "kode_saham": "PWON.JK" },
            { "kode_saham": "PYFA.JK" },
            { "kode_saham": "PZZA.JK" },
            { "kode_saham": "RALS.JK" },
            { "kode_saham": "RANC.JK" },
            { "kode_saham": "RBMS.JK" },
            { "kode_saham": "RDTX.JK" },
            { "kode_saham": "RELI.JK" },
            { "kode_saham": "RICY.JK" },
            { "kode_saham": "RIGS.JK" },
            { "kode_saham": "RIMO.JK" },
            { "kode_saham": "RISE.JK" },
            { "kode_saham": "RMBA.JK" },
            { "kode_saham": "RODA.JK" },
            { "kode_saham": "ROTI.JK" },
            { "kode_saham": "RUIS.JK" },
            { "kode_saham": "SAFE.JK" },
            { "kode_saham": "SAME.JK" },
            { "kode_saham": "SAPX.JK" },
            { "kode_saham": "SATU.JK" },
            { "kode_saham": "SCCO.JK" },
            { "kode_saham": "SCMA.JK" },
            { "kode_saham": "SDMU.JK" },
            { "kode_saham": "SDPC.JK" },
            { "kode_saham": "SDRA.JK" },
            { "kode_saham": "SFAN.JK" },
            { "kode_saham": "SGRO.JK" },
            { "kode_saham": "SHID.JK" },
            { "kode_saham": "SHIP.JK" },
            { "kode_saham": "SIDO.JK" },
            { "kode_saham": "SILO.JK" },
            { "kode_saham": "SIMA.JK" },
            { "kode_saham": "SIMP.JK" },
            { "kode_saham": "SINI.JK" },
            { "kode_saham": "SIPD.JK" },
            { "kode_saham": "SKBM.JK" },
            { "kode_saham": "SKLT.JK" },
            { "kode_saham": "SKRN.JK" },
            { "kode_saham": "SKYB.JK" },
            { "kode_saham": "SLIS.JK" },
            { "kode_saham": "SMAR.JK" },
            { "kode_saham": "SMBR.JK" },
            { "kode_saham": "SMCB.JK" },
            { "kode_saham": "SMDM.JK" },
            { "kode_saham": "SMDR.JK" },
            { "kode_saham": "SMGR.JK" },
            { "kode_saham": "SMKL.JK" },
            { "kode_saham": "SMMA.JK" },
            { "kode_saham": "SMMT.JK" },
            { "kode_saham": "SMRA.JK" },
            { "kode_saham": "SMRU.JK" },
            { "kode_saham": "SMSM.JK" },
            { "kode_saham": "SONA.JK" },
            { "kode_saham": "SOSS.JK" },
            { "kode_saham": "SOTS.JK" },
            { "kode_saham": "SPMA.JK" },
            { "kode_saham": "SPTO.JK" },
            { "kode_saham": "SQMI.JK" },
            { "kode_saham": "SRAJ.JK" },
            { "kode_saham": "SRIL.JK" },
            { "kode_saham": "SRSN.JK" },
            { "kode_saham": "SRTG.JK" },
            { "kode_saham": "SSIA.JK" },
            { "kode_saham": "SSMS.JK" },
            { "kode_saham": "SSTM.JK" },
            { "kode_saham": "STAR.JK" },
            { "kode_saham": "STTP.JK" },
            { "kode_saham": "SULI.JK" },
            { "kode_saham": "SUPR.JK" },
            { "kode_saham": "SURE.JK" },
            { "kode_saham": "SWAT.JK" },
            { "kode_saham": "TALF.JK" },
            { "kode_saham": "TARA.JK" },
            { "kode_saham": "TAXI.JK" },
            { "kode_saham": "TBIG.JK" },
            { "kode_saham": "TBLA.JK" },
            { "kode_saham": "TBMS.JK" },
            { "kode_saham": "TCID.JK" },
            { "kode_saham": "TCPI.JK" },
            { "kode_saham": "TDPM.JK" },
            { "kode_saham": "TEBE.JK" },
            { "kode_saham": "TELE.JK" },
            { "kode_saham": "TFAS.JK" },
            { "kode_saham": "TFCO.JK" },
            { "kode_saham": "TGKA.JK" },
            { "kode_saham": "TGRA.JK" },
            { "kode_saham": "TIFA.JK" },
            { "kode_saham": "TINS.JK" },
            { "kode_saham": "TIRA.JK" },
            { "kode_saham": "TIRT.JK" },
            { "kode_saham": "TKIM.JK" },
            { "kode_saham": "TLKM.JK" },
            { "kode_saham": "TMAS.JK" },
            { "kode_saham": "TMPO.JK" },
            { "kode_saham": "TNCA.JK" },
            { "kode_saham": "TOBA.JK" },
            { "kode_saham": "TOPS.JK" },
            { "kode_saham": "TOTL.JK" },
            { "kode_saham": "TOTO.JK" },
            { "kode_saham": "TOWR.JK" },
            { "kode_saham": "TPIA.JK" },
            { "kode_saham": "TPMA.JK" },
            { "kode_saham": "TRAM.JK" },
            { "kode_saham": "TRIM.JK" },
            { "kode_saham": "TRIS.JK" },
            { "kode_saham": "TRST.JK" },
            { "kode_saham": "TRUK.JK" },
            { "kode_saham": "TRUS.JK" },
            { "kode_saham": "TSPC.JK" },
            { "kode_saham": "TUGU.JK" },
            { "kode_saham": "TURI.JK" },
            { "kode_saham": "ULTJ.JK" },
            { "kode_saham": "UNIC.JK" },
            { "kode_saham": "UNIT.JK" },
            { "kode_saham": "UNSP.JK" },
            { "kode_saham": "UNTR.JK" },
            { "kode_saham": "UNVR.JK" },
            { "kode_saham": "URBN.JK" },
            { "kode_saham": "VICO.JK" },
            { "kode_saham": "VINS.JK" },
            { "kode_saham": "VIVA.JK" },
            { "kode_saham": "VOKS.JK" },
            { "kode_saham": "VRNA.JK" },
            { "kode_saham": "WAPO.JK" },
            { "kode_saham": "WEGE.JK" },
            { "kode_saham": "WEHA.JK" },
            { "kode_saham": "WICO.JK" },
            { "kode_saham": "WIIM.JK" },
            { "kode_saham": "WIKA.JK" },
            { "kode_saham": "WINS.JK" },
            { "kode_saham": "WOMF.JK" },
            { "kode_saham": "WOOD.JK" },
            { "kode_saham": "WOWS.JK" },
            { "kode_saham": "WSBP.JK" },
            { "kode_saham": "WSKT.JK" },
            { "kode_saham": "WTON.JK" },
            { "kode_saham": "YELO.JK" },
            { "kode_saham": "YPAS.JK" },
            { "kode_saham": "YULE.JK" },
            { "kode_saham": "ZBRA.JK" },
            { "kode_saham": "ZINC.JK" },
            { "kode_saham": "ZONE.JK" },
        ]
        var sum = []
        let undervalued_sum_10 = []
        let undervalued_sum_20 = []
        let undervalued_sum_30 = []
        let undervalued_sum_40 = []
        let undervalued_sum_50 = []

        var obligasi_pemerintah_indo = 6
        var obligasi_korporasi_indo = 8

        //asumsi eps growth 10% stabil
        function hrgWjr10(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 10
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * obligasi_pemerintah_indo) / obligasi_korporasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return parseInt(harga_wajar)
        }
        //asumsi eps growth 20% stabil
        function hrgWjr20(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 20
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * obligasi_pemerintah_indo) / obligasi_korporasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return parseInt(harga_wajar)
        }
        //asumsi eps growth 30% stabil
        function hrgWjr30(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 30
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * obligasi_pemerintah_indo) / obligasi_korporasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return parseInt(harga_wajar)
        }
        //asumsi eps growth 40% stabil
        function hrgWjr40(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 40
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * obligasi_pemerintah_indo) / obligasi_korporasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return parseInt(harga_wajar)
        }
        //asumsi eps growth 50% stabil
        function hrgWjr50(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 50
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * obligasi_pemerintah_indo) / obligasi_korporasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return parseInt(harga_wajar)
        }
        for (var i = 0; i < code.length; i++) {
            const data = await yahooFinance.quote({
                symbol: code[i].kode_saham,
                modules: ['price', 'earnings', 'financialData', 'defaultKeyStatistics']  // ex: ['price', 'summaryDetail']
            });
            // if(!data.price || !data.price.regularMarketPrice || !data.defaultKeyStatistics || !data.defaultKeyStatistics.trailingEps){
            //     break
            // }
            // console.log(data.price.symbol)
            const last_price = data.price.regularMarketPrice
            const EPS = data.defaultKeyStatistics.trailingEps
            // const DER = data.financialData.debtToEquity

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
                const persentase_kemurahan = ((harga_wajar_10 / last_price) - 1) * 100
                // const persentase_kemurahan = 10
                const undervalued = { "last_price": last_price, "harga_wajar": harga_wajar_10, "code_saham": code_saham, "persentase_kemurahan": parseInt(persentase_kemurahan), "status": status }
                undervalued_sum_10.push(undervalued)
            } else {
                var status = "OVERVALUED"
            }

            //medium
            if (last_price < harga_wajar_20) {
                var status = "UNDERVALUED"
                const persentase_kemurahan = ((harga_wajar_20 / last_price) - 1) * 100
                // const persentase_kemurahan = 10
                const undervalued = { "last_price": last_price, "harga_wajar": harga_wajar_20, "code_saham": code_saham, "persentase_kemurahan": parseInt(persentase_kemurahan), "status": status }
                undervalued_sum_20.push(undervalued)
            } else {
                var status = "OVERVALUED"
            }

            //high
            if (last_price < harga_wajar_30) {
                var status = "UNDERVALUED"
                const persentase_kemurahan = ((harga_wajar_30 / last_price) - 1) * 100
                // const persentase_kemurahan = 10
                const undervalued = { "last_price": last_price, "harga_wajar": harga_wajar_30, "code_saham": code_saham, "persentase_kemurahan": parseInt(persentase_kemurahan), "status": status }
                undervalued_sum_30.push(undervalued)
            } else {
                var status = "OVERVALUED"
            }

            //high
            if (last_price < harga_wajar_40) {
                var status = "UNDERVALUED"
                const persentase_kemurahan = ((harga_wajar_40 / last_price) - 1) * 100
                // const persentase_kemurahan = 10
                const undervalued = { "last_price": last_price, "harga_wajar": harga_wajar_40, "code_saham": code_saham, "persentase_kemurahan": parseInt(persentase_kemurahan), "status": status }
                undervalued_sum_40.push(undervalued)
            } else {
                var status = "OVERVALUED"
            }

            //high
            if (last_price < harga_wajar_50) {
                var status = "UNDERVALUED"
                const persentase_kemurahan = ((harga_wajar_50 / last_price) - 1) * 100
                // const persentase_kemurahan = 10
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
        var undervalued_sum_all_emiten_kz = {undervalued_sum_10, undervalued_sum_20, undervalued_sum_30, undervalued_sum_40, undervalued_sum_50}
        await Redis.set('undervalued_sum_all_emiten_kz', JSON.stringify(undervalued_sum_all_emiten_kz))
        Redis.expire('undervalued_sum_all_emiten_kz', 3600)
        const stat = "Not Cached"
        return view.render('analisis_all_emiten_kz', { undervalued_sum_10, undervalued_sum_20, undervalued_sum_30, undervalued_sum_40, undervalued_sum_50 })
    }
    async analisisSingleEmitenFind({ request, view, response, auth }) {
        const kode_emiten = request.input('kode_emiten')
        const EPS_growth = request.input('eps_growth')
        const EPS_TTM = request.input('eps_ttm')

        const data_single = await yahooFinance.quote({
            symbol: kode_emiten,
            modules: ['price', 'earnings', 'financialData', 'defaultKeyStatistics']  // ex: ['price', 'summaryDetail']
        });
        const last_price = data_single.price.regularMarketPrice
        if(EPS_TTM){
            var EPS = EPS_TTM
        }else{
            var EPS = data_single.defaultKeyStatistics.trailingEps
        }

        const PER_non_growth_company = 7
        const eps_growth = parseInt(EPS_growth)
        const obligasi_pemerintah_indo = 6
        const obligasi_korporasi_indo = 8
        const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * obligasi_pemerintah_indo) / obligasi_korporasi_indo
        const harga_wajar_float = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
        const harga_wajar = parseInt(harga_wajar_float)
        const persentase_kemurahan_float = ((harga_wajar / last_price) - 1) * 100
        const persentase_kemurahan = parseInt(persentase_kemurahan_float)

        const data = { kode_emiten, EPS_growth, harga_wajar, last_price, EPS, persentase_kemurahan }


        return view.render('analisis_single_emiten', { data })


    }
    async home({ request, view, response, auth }) {
        return view.render('home')
    }
    async portofolio({ request, view, response, auth }) {
        let res = await axios.get("https://my-json-server.typicode.com/fgprayogo/db-json-sahamapp/db")
        let portofolio_galih = res.data.portofolio_galih
        let portofolio_bagus = res.data.portofolio_bagus
        let portofolio_fadil = res.data.portofolio_fadil
        

        for (let i = 0; i < portofolio_galih.length; i++) {
            let data_single = await yahooFinance.quote({
                symbol: portofolio_galih[i].kode_emiten,
                modules: ['price', 'earnings', 'financialData', 'defaultKeyStatistics']  // ex: ['price', 'summaryDetail']
            });
            let last_price = data_single.price.regularMarketPrice
            let persentase = ((last_price / portofolio_galih[i].avg) - 1) * 100
            let persentase_fixed = parseFloat(persentase).toFixed(2)
            let potential_profit = ((portofolio_galih[i].target_price / portofolio_galih[i].avg) - 1) * 100
            Object.assign(portofolio_galih[i], { "last_price": last_price, "persentase": persentase_fixed, "potential_profit": parseInt(potential_profit) })
        }
        for (let i = 0; i < portofolio_bagus.length; i++) {
            let data_single = await yahooFinance.quote({
                symbol: portofolio_bagus[i].kode_emiten,
                modules: ['price', 'earnings', 'financialData', 'defaultKeyStatistics']  // ex: ['price', 'summaryDetail']
            });
            const last_price = data_single.price.regularMarketPrice
            let persentase = ((last_price / portofolio_bagus[i].avg) - 1) * 100
            let persentase_fixed = parseFloat(persentase).toFixed(2)
            let potential_profit = ((portofolio_bagus[i].target_price / portofolio_bagus[i].avg) - 1) * 100

            Object.assign(portofolio_bagus[i], { "last_price": last_price, "persentase": persentase_fixed, "potential_profit": parseInt(potential_profit) })
        }
        for (let i = 0; i < portofolio_fadil.length; i++) {
            let data_single = await yahooFinance.quote({
                symbol: portofolio_fadil[i].kode_emiten,
                modules: ['price', 'earnings', 'financialData', 'defaultKeyStatistics']  // ex: ['price', 'summaryDetail']
            });
            const last_price = data_single.price.regularMarketPrice
            let persentase = ((last_price / portofolio_fadil[i].avg) - 1) * 100
            let persentase_fixed = parseFloat(persentase).toFixed(2)
            let potential_profit = ((portofolio_fadil[i].target_price / portofolio_fadil[i].avg) - 1) * 100

            Object.assign(portofolio_fadil[i], { "last_price": last_price, "persentase": persentase_fixed, "potential_profit": parseInt(potential_profit) })
        }
        return view.render('portofolio', { portofolio_galih, portofolio_bagus, portofolio_fadil })

    }
    async price({ request, view, response, auth }) {
        // const data = await si.getSingleStockInfo('MNCN.JK')
        // const data = yahoo.earningsGrowth('MNCN.JK')
        const data = await yahooFinance.quote({
            symbol: 'APOL.JK',
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
            const obligasi_pemerintah_indo = 6.5
            const obligasi_korporasi_indo = 11
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * obligasi_pemerintah_indo) / obligasi_korporasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return harga_wajar
        }
        //asumsi eps growth 20% stabil
        function hrgWjr20(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 20
            const obligasi_pemerintah_indo = 6.5
            const obligasi_korporasi_indo = 11
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * obligasi_pemerintah_indo) / obligasi_korporasi_indo
            const harga_wajar = calc_harga_wajar - (calc_harga_wajar * 50 / 100)
            return harga_wajar
        }
        //asumsi eps growth 30% stabil
        function hrgWjr30(EPS) {
            const PER_non_growth_company = 7
            const eps_growth = 30
            const obligasi_pemerintah_indo = 6.5
            const obligasi_korporasi_indo = 11
            const calc_harga_wajar = (EPS * (PER_non_growth_company + eps_growth) * obligasi_pemerintah_indo) / obligasi_korporasi_indo
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

        // return axios.get("https://my-json-server.typicode.com/fgprayogo/db-json-sahamapp/db/",{})
        let res = await axios.get("https://my-json-server.typicode.com/fgprayogo/db-json-sahamapp/db")
        let portofolio_galih = res.data.portofolio_galih
        let portofolio_bagus = res.data.portofolio_bagus
        let portofolio_fadil = res.data.portofolio_fadil
        return response.json({ portofolio_galih })
    }
    async epsTtm({ request, view, response, auth }) {
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
            { "kode_saham": "BBKP.JK" },
            { "kode_saham": "BBNI.JK" },
            { "kode_saham": "BBRI.JK" },
            { "kode_saham": "BBTN.JK" },
            { "kode_saham": "BDMN.JK" },
            { "kode_saham": "BEST.JK" },
            { "kode_saham": "BJBR.JK" },
            { "kode_saham": "BJTM.JK" },
            { "kode_saham": "BMRI.JK" },
            { "kode_saham": "BMTR.JK" },
            { "kode_saham": "BNLI.JK" },
            { "kode_saham": "BRIS.JK" },
            { "kode_saham": "BRPT.JK" },
            { "kode_saham": "BSDE.JK" },
            { "kode_saham": "BTPS.JK" },
            { "kode_saham": "BULL.JK" },
            { "kode_saham": "CLEO.JK" },
            { "kode_saham": "CPIN.JK" },
            { "kode_saham": "CTRA.JK" },
            { "kode_saham": "DMAS.JK" },
            { "kode_saham": "ELSA.JK" },
            { "kode_saham": "ERAA.JK" },
            { "kode_saham": "EXCL.JK" },
            { "kode_saham": "GGRM.JK" },
            { "kode_saham": "GIAA.JK" },
            { "kode_saham": "HKMU.JK" },
            { "kode_saham": "HMSP.JK" },
            { "kode_saham": "HOKI.JK" },
            { "kode_saham": "ICBP.JK" },
            { "kode_saham": "INAF.JK" },
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
            { "kode_saham": "KAEF.JK" },
            { "kode_saham": "KBLI.JK" },
            { "kode_saham": "KINO.JK" },
            { "kode_saham": "KLBF.JK" },
            { "kode_saham": "LINK.JK" },
            { "kode_saham": "LPKR.JK" },
            { "kode_saham": "LPPF.JK" },
            { "kode_saham": "LSIP.JK" },
            { "kode_saham": "MAIN.JK" },
            { "kode_saham": "MAPI.JK" },
            { "kode_saham": "MDKA.JK" },
            { "kode_saham": "MEDC.JK" },
            { "kode_saham": "MIKA.JK" },
            { "kode_saham": "MNCN.JK" },
            { "kode_saham": "MTDL.JK" },
            { "kode_saham": "MYOR.JK" },
            { "kode_saham": "PGAS.JK" },
            { "kode_saham": "PNBN.JK" },
            { "kode_saham": "PNLF.JK" },
            { "kode_saham": "PSAB.JK" },
            { "kode_saham": "PTBA.JK" },
            { "kode_saham": "PTPP.JK" },
            { "kode_saham": "PWON.JK" },
            { "kode_saham": "RALS.JK" },
            { "kode_saham": "SCMA.JK" },
            { "kode_saham": "SIDO.JK" },
            { "kode_saham": "SILO.JK" },
            { "kode_saham": "SIMP.JK" },
            { "kode_saham": "SMBR.JK" },
            { "kode_saham": "SMGR.JK" },
            { "kode_saham": "SMRA.JK" },
            { "kode_saham": "SMSM.JK" },
            { "kode_saham": "SPTO.JK" },
            { "kode_saham": "SRIL.JK" },
            { "kode_saham": "SSIA.JK" },
            { "kode_saham": "SSMS.JK" },
            { "kode_saham": "TBIG.JK" },
            { "kode_saham": "TINS.JK" },
            { "kode_saham": "TKIM.JK" },
            { "kode_saham": "TLKM.JK" },
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
        const eps_sum = []
        for (var i = 0; i < code.length; i++) {
            const data = await yahooFinance.quote({
                symbol: code[i].kode_saham,
                modules: ['price', 'earnings', 'financialData', 'defaultKeyStatistics']  // ex: ['price', 'summaryDetail']
            });
            const last_price = data.price.regularMarketPrice
            const EPS = data.defaultKeyStatistics.trailingEps
            eps_sum.push(EPS)
        }
        return response.json({ eps_sum })
    }
}

module.exports = SahamController





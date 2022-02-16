import { Box, Button, Hidden, Typography } from "@mui/material";
import theme from "../../Theme/Theme";
import FondoHome from "../../assets/FondoHome.svg";
import Grid from "@mui/material/Grid";

const Landing = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
          <div id="banner-text">
                    <Typography variant="h2" color="secondary">
                        <Box component="span">
                            Tokenización
                        </Box>
                        <Box component="span" color="Scrollbar" bgcolor={theme.palette.secondary.main}>de activos financieros</Box>
                    </Typography>
                    <Typography variant="h5" component="p">
                        Invierta de manera fácil y segura en RealEstate utilizando la tecnología Blockchain y Smart Contracts. Acceda a las mejores oportunidades de inversiones moviliarias con una alta rentabilidad y liquidez.
                    </Typography>
                    <Button variant="contained" color="primary">
                        <Typography variant="h5">COMIENTE A INVERTIR</Typography>
                    </Button>
                </div>
          </Grid>
          <Grid item xs={6}>
          <div id="banner-img">
                    <img src={FondoHome} alt="Landing Banner" />
                </div>
          </Grid>

        </Grid>
      </Box>
      {/* <section id="landing-section-banner" className="landing-section">
                <div id="banner-text">
                    <Typography variant="h2" color="secondary">
                        <Box component="span">
                            Tokenización
                        </Box>
                        <Box component="span" color="Scrollbar" bgcolor={theme.palette.secondary.main}>de activos financieros</Box>
                    </Typography>
                    <Typography variant="h5" component="p">
                        Invierta de manera fácil y segura en RealEstate utilizando la tecnología Blockchain y Smart Contracts. Acceda a las mejores oportunidades de inversiones moviliarias con una alta rentabilidad y liquidez.
                    </Typography>
                    <Button variant="contained" color="primary">
                        <Typography variant="h5">COMIENTE A INVERTIR</Typography>
                    </Button>
                </div>
                <div id="banner-img">
                    <img src="/assets/svg/header02.svg" alt="Landing Banner" />
                </div>
            </section>
            <section id="landing-section-roundicons" className="landing-section">
                <div className="roundicons-item">
                    <img src="/assets/svg/iconos-01.svg" alt="Landing Roundicons 01" />
                    <Typography variant="h5" className="roundicons-item-title">1. BÚSQUEDA</Typography>
                    <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, quisquam.</Typography>
                </div>
                <div className="roundicons-item">
                    <img src="/assets/svg/iconos-02.svg" alt="Landing Roundicons 02" />
                    <Typography variant="h5" className="roundicons-item-title">2. TOKENIZACIÓN</Typography>
                    <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, quisquam.</Typography>
                </div>
                <div className="roundicons-item">
                    <img src="/assets/svg/iconos-03.svg" alt="Landing Roundicons 03" />
                    <Typography variant="h5" className="roundicons-item-title">3. DIVIDENDOS</Typography>
                    <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, quisquam.</Typography>
                </div>
                <div className="roundicons-item">
                    <img src="/assets/svg/iconos-04.svg" alt="Landing Roundicons 04" />
                    <Typography variant="h5" className="roundicons-item-title">4. MARKETPLACE</Typography>
                    <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, quisquam.</Typography>
                </div>
            </section>
            <section id="landing-section-how" className="landing-section">
                <Hidden mdDown>
                    <div id="how-img">
                        <img src="/assets/svg/dibujo.svg" alt="How it works?" />
                    </div>
                </Hidden>
                <div id="how-text">
                    <Typography color="secondary" id="how-text-first">Encontrá el mejor proyecto para invertir</Typography>
                    <Typography color="inherit" variant="h4" id="how-text-second">¿Qué activos se pueden tokenizar?</Typography>
                    <Typography color="inherit" id="how-text-third">Es posible mediante blockchain diversos tipos de activos financieros:</Typography>
                    <div id="how-icons">
                        <img src="/assets/svg/iconos-03-ASD.svg" alt="iconos03-ASD.svg" />
                        <img src="/assets/svg/iconos-04-ASD.svg" alt="iconos04-ASD.svg" />
                        <img src="/assets/svg/iconos-05.svg" alt="iconos05.svg" />
                    </div>
                    <Typography color="inherit" variant="h4" id="how-text-fourth">¿Qué es la tokenización?</Typography>
                    <Typography color="inherit" id="how-text-fifth">Es el proceso de digitalización de activos a través de la blockchain. Todas las transacciones son inmutables, están garantizadas y derecho el cual puede ser comercializado de manera segura y sin intermediarios en cualquier momento.</Typography>
                </div>
            </section>
            <section id="landing-section-benefits" className="landing-section">
                <Typography color="inherit" variant="h4">Ventajas de la Tokenización</Typography>
                <Typography color="inherit">La tokenización de activos mediante blockchain es una tecnologia innovadora que democratiza y facilita la inversion en RealEstate y amplía las posibilidades de financiación de proyectos.</Typography>
                <div id="benefits-icons">
                    <div className="benefit-icons-item">
                        <img src="/assets/svg/iconosC-01.svg" alt="Iconos C" />
                        <Typography color="secondary" variant="h6">Digitalización</Typography>
                        <Typography color="inherit">Tokenizar activos, transacciones sin intermediarios</Typography>
                    </div>
                    <div className="benefit-icons-item">
                        <img src="/assets/svg/iconosC-02.svg" alt="Iconos C" />
                        <Typography color="secondary" variant="h6">Reducción de costo</Typography>
                        <Typography color="inherit">Transferencias a bajo coste, rápidas y seguras. Fácil almacenamiento del activo tokenizado</Typography>
                    </div>
                    <div className="benefit-icons-item">
                        <img src="/assets/svg/iconosC-03.svg" alt="Iconos C" />
                        <Typography color="secondary" variant="h6">Liquidez</Typography>
                        <Typography color="inherit">Comercialización de los tokens en mercados secundarios</Typography>
                    </div>
                    <div className="benefit-icons-item">
                        <img src="/assets/svg/iconosC-04.svg" alt="Iconos C" />
                        <Typography color="secondary" variant="h6">Diversificación</Typography>
                        <Typography color="inherit">Reduce la barrera de entrada para invertir, es posible desde 1USD. El inversor percibe ingresos pasivos</Typography>
                    </div>
                    <div className="benefit-icons-item">
                        <img src="/assets/svg/iconosC-05.svg" alt="Iconos C" />
                        <Typography color="secondary" variant="h6">Financiación de proyectos</Typography>
                        <Typography color="inherit">El desarrollador obtiene financiación por parte de los inversores quienes resibirán los tokens y obtendrán ingresos pasivos</Typography>
                    </div>
                </div>
            </section>
            <section id="landing-section-blockchain" className="landing-section">
                <div id="block-text">
                    <Typography color="inherit" variant="h4">¿Cómo funciona la blockchain?</Typography>
                    <Typography>Blockchain es una tecnología que genera bases de datos inmutables distribuidas en un entorno digital. Se almacena y verifica la información sin una entidad central que intervenga.</Typography>
                    <Typography>Esto habilita, entre otras cosas, la creación de valores digitales que pueden ser comercializados sin necesidad de pasar por intermediarios.</Typography>
                </div>
                <Hidden mdDown>
                    <div id="block-img">
                        <img src="/assets/svg/comoFunciona.svg" alt="Blockchain" />
                    </div>
                </Hidden>
            </section> */}
    </>
  );
};

export default Landing;

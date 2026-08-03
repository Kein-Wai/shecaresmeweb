import React, { useState } from 'react';
import { 
  Tabs, Tab, Box, Typography, Container, 
  Card, CardMedia, CardContent, Button,
  Stack, Divider, ThemeProvider, createTheme, CssBaseline, Grid,
  Dialog, DialogTitle, DialogContent, IconButton // <-- Nuevos componentes para el Modal
} from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InstagramIcon from '@mui/icons-material/Instagram';
import CloseIcon from '@mui/icons-material/Close'; // <-- Icono para cerrar el Modal

const theme = createTheme({
  palette: {
    primary: { main: '#2c2c2c' }, // Gris carbón
    secondary: { main: '#c0a062' }, // Dorado
    background: { default: '#faf9f7', paper: '#ffffff' },
  },
  typography: {
    fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Playfair Display", serif' },
    h2: { fontFamily: '"Playfair Display", serif' },
    h3: { fontFamily: '"Playfair Display", serif' },
    h4: { fontFamily: '"Playfair Display", serif' },
    h5: { fontFamily: '"Playfair Display", serif' },
    h6: { fontFamily: '"Playfair Display", serif' },
    button: { fontFamily: '"Montserrat", sans-serif', fontWeight: 600, letterSpacing: '1px' }
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'none', padding: '10px 24px' } } },
    MuiTab: { styleOverrides: { root: { fontWeight: 600, textTransform: 'none', fontSize: '1rem' } } }
  }
});

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`peluqueria-tabpanel-${index}`} {...other}>
      {value === index && <Box sx={{ p: { xs: 2, md: 4 } }}>{children}</Box>}
    </div>
  );
}

// --- DATOS ---
const listaServicios = [
  { titulo: 'Corte y Estilo', descripcion: 'Asesoramiento personalizado y corte a medida para resaltar tus mejores facciones.', precio: 'Desde 25€', imagen: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=500&q=80' },
  { titulo: 'Coloración y Mechas', descripcion: 'Balayage, babylights y tintes con productos de primera calidad que cuidan tu cabello.', precio: 'Desde 45€', imagen: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=500&q=80' },
  { titulo: 'Tratamientos Capilares', descripcion: 'Hidratación profunda, keratina y bótox capilar para devolverle la vida a tu pelo.', precio: 'Desde 35€', imagen: '/imagenes/servicios/capilar.jpg' },
  { titulo: 'Peinados y Eventos', descripcion: 'Recogidos y peinados elegantes para novias, invitadas y ocasiones especiales.', precio: 'Desde 40€', imagen: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=500&q=80' }
];

// 💍 NUEVOS DATOS: Lista de Novias y sus galerías
const listaNovias = [
  {
    nombre: 'Ana Marques',
    imagenPrincipal: '/imagenes/novias/anamarques/WhatsApp Image 2023-06-22 at 07.24.58.jpeg',
    galeria: [
      '/imagenes/novias/anamarques/WhatsApp Image 2023-06-22 at 07.24.58.jpeg',
      '/imagenes/novias/anamarques/WhatsApp Image 2023-06-21 at 20.58.02.jpeg',
      '/imagenes/novias/anamarques/WhatsApp Image 2023-06-22 at 07.24.09 (1).jpeg',
      '/imagenes/novias/anamarques/WhatsApp Image 2023-06-22 at 07.24.09.jpeg',
      '/imagenes/novias/anamarques/WhatsApp Image 2023-06-22 at 07.24.10 (1).jpeg',
      '/imagenes/novias/anamarques/WhatsApp Image 2023-06-22 at 07.24.10.jpeg'
    ]
  },
  {
    nombre: 'Andrea Garcia',
    imagenPrincipal: '/imagenes/novias/andreagarcia/3.jpeg',
    galeria: [
      '/imagenes/novias/andreagarcia/3.jpeg',
      '/imagenes/novias/andreagarcia/2.jpeg',
      '/imagenes/novias/andreagarcia/5.jpeg',
      '/imagenes/novias/andreagarcia/9.jpeg',
      '/imagenes/novias/andreagarcia/12.jpeg',
      '/imagenes/novias/andreagarcia/15.jpeg'
    ]
  },
  {
    nombre: 'Arantxa Calvo',
    imagenPrincipal: '/imagenes/novias/arantxacalvo/1.jpg',
    galeria: [
      '/imagenes/novias/arantxacalvo/1.jpg',
      '/imagenes/novias/arantxacalvo/2.jpg',
      '/imagenes/novias/arantxacalvo/3.jpg',
      '/imagenes/novias/arantxacalvo/4.jpg',
      '/imagenes/novias/arantxacalvo/5.jpeg',
      '/imagenes/novias/arantxacalvo/6.jpeg'
    ]
  }
];

const fotosInstagram = [
  '/imagenes/instagram/1.png',
  '/imagenes/instagram/2.png',
  '/imagenes/instagram/3.png',
  '/imagenes/instagram/4.png'
];

const equipo = [
  { nombre: 'Sheila Valle', rol: 'Maquilladora', imagen: '/imagenes/team/sheila.jpg' },
  { nombre: 'Carolina Cortes', rol: 'Estilista Senior', imagen: '/imagenes/team/carol.png' },
  { nombre: 'Andrea Arroyo', rol: 'Estilista', imagen: '/imagenes/team/andrea.png' }
];

function App() {
  const [value, setValue] = useState(0);
  
  // Estados para controlar el Modal de las novias
  const [openModal, setOpenModal] = useState(false);
  const [noviaSeleccionada, setNoviaSeleccionada] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenModal = (novia) => {
    setNoviaSeleccionada(novia);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    // Un pequeño retraso al limpiar para que la animación de cierre no dé tirones
    setTimeout(() => setNoviaSeleccionada(null), 300);
  };

  const goToIG = () => {
    window.open("https://www.instagram.com/shecares.me/")
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            She Cares Me
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Tu estilo, nuestra pasión.
          </Typography>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
          <Tabs 
            value={value} 
            onChange={handleChange} 
            variant="scrollable" 
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Servicios" />
            <Tab label="Novias" /> {/* <-- Nueva Pestaña */}
            <Tab label="Quiénes Somos" />
            <Tab label="Historia" />
            <Tab label="Ubicación" />
          </Tabs>
        </Box>

        {/* PESTAÑA 0: SERVICIOS */}
        <CustomTabPanel value={value} index={0}>
          <Grid container spacing={4}>
            {listaServicios.map((servicio, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #eee',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s',
                    '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 20px rgba(0,0,0,0.08)' }
                  }}
                >
                  <CardMedia component="img" height="220" image={servicio.imagen} alt={servicio.titulo} />
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography gutterBottom variant="h6" component="h2" fontWeight="bold">{servicio.titulo}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{servicio.descripcion}</Typography>
                    <Typography variant="subtitle1" fontWeight="bold" color="primary">{servicio.precio}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button variant="contained" color="primary" size="large" sx={{ borderRadius: '30px', px: 5, py: 1.5 }}>
              Reservar Cita
            </Button>
          </Box>
        </CustomTabPanel>

        {/* PESTAÑA 1: NOVIAS (NUEVA) */}
        <CustomTabPanel value={value} index={1}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>Especial Novias</Typography>
            <Typography color="text.secondary">
              Acompañándote en el día más importante para que luzcas radiante.
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {listaNovias.map((novia, index) => (
              // md: 4 significa que ocupará 4 de 12 columnas (es decir, 3 por fila)
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card 
                  elevation={0} 
                  onClick={() => handleOpenModal(novia)}
                  sx={{ 
                    cursor: 'pointer', // Cambia el cursor para indicar que se puede hacer clic
                    height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid #eee',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s',
                    '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 20px rgba(0,0,0,0.08)' }
                  }}
                >
                  <CardMedia component="img" height="320" image={novia.imagenPrincipal} alt={novia.nombre} />
                  <CardContent sx={{ textAlign: 'center', backgroundColor: '#fff' }}>
                    <Typography variant="h6" component="h2" fontWeight="bold">{novia.nombre}</Typography>
                    <Typography variant="body2" color="primary" sx={{ mt: 1, textDecoration: 'underline' }}>
                      Ver galería completa
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CustomTabPanel>

        {/* PESTAÑA 2: QUIÉNES SOMOS (Antes index 1) */}
        <CustomTabPanel value={value} index={2}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>Conoce a nuestro equipo</Typography>
            <Typography color="text.secondary">Profesionales apasionados por sacar tu mejor versión.</Typography>
          </Box>
          <Grid container spacing={4} justifyContent="center">
            {equipo.map((miembro, index) => (
              <Grid size={{ xs: 12, sm: 4 }} key={index} sx={{ textAlign: 'center' }}>
                <Box component="img" src={miembro.imagen} alt={miembro.nombre} sx={{ width: 160, height: 160, borderRadius: '50%', objectFit: 'cover', mb: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Typography variant="h6" fontWeight="bold">{miembro.nombre}</Typography>
                <Typography color="text.secondary">{miembro.rol}</Typography>
              </Grid>
            ))}
          </Grid>
        </CustomTabPanel>

        {/* PESTAÑA 3: HISTORIA (Antes index 2) */}
        <CustomTabPanel value={value} index={3}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Box component="img" src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=600&q=80" alt="Interior del salón" sx={{ width: '100%', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>Nuestra Historia</Typography>
              <Typography paragraph color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>Todo empezó hace más de 10 años con un sillón, un espejo y muchísima ilusión...</Typography>
              <Typography paragraph color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>A lo largo de los años, hemos crecido, nos hemos formado en las mejores academias...</Typography>
            </Grid>
          </Grid>
        </CustomTabPanel>

        {/* PESTAÑA 4: UBICACIÓN E INSTAGRAM (Antes index 3) */}
        <CustomTabPanel value={value} index={4}>
          <Grid container spacing={4} sx={{ mb: 6 }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>Visítanos</Typography>
              <Typography color="text.secondary" sx={{ mb: 4 }}>Pásate por nuestro salón. Te invitamos a un café mientras decides tu nuevo look.</Typography>
              <Stack spacing={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><LocationOnIcon color="primary" /><Box><Typography fontWeight="bold">Dirección</Typography><Typography color="text.secondary">Calle Carcagente 24, Castellon de la Plana</Typography></Box></Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><PhoneIcon color="primary" /><Box><Typography fontWeight="bold">Teléfono / Reservas</Typography><Typography color="text.secondary">+34 624 653 142</Typography></Box></Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><AccessTimeIcon color="primary" /><Box><Typography fontWeight="bold">Horario</Typography><Typography color="text.secondary">L-V: 10:00 - 19:00 <br/> Sábados: 10:00 - 14:00</Typography></Box></Box>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Box sx={{ width: '100%', height: '300px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3057.251336979107!2d-0.03484522311236975!3d39.98048827151312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd600121485cf9f5%3A0x3271400951f45b13!2sSHE%20CARES%20ME!5e0!3m2!1sen!2ses!4v1785789528792!5m2!1sen!2ses" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 6 }} />
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>Síguenos en Instagram</Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>@shecares.me</Typography>
          </Box>
          <Grid container spacing={2}>
            {fotosInstagram.map((foto, index) => (
              <Grid size={{ xs: 6, md: 3 }} key={index}>
                <Box component="img" src={foto} alt={`Instagram foto ${index + 1}`} sx={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: '12px', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="outlined" color="primary" startIcon={<InstagramIcon />} onClick={goToIG} sx={{ borderRadius: '30px', px: 4, textTransform: 'none' }}>
              Ver perfil completo
            </Button>
          </Box>
        </CustomTabPanel>

      </Container>

      {/* 🖼️ MODAL DE GALERÍA DE NOVIAS */}
      <Dialog 
        open={openModal} 
        onClose={handleCloseModal}
        maxWidth="md" // Ancho máximo del modal
        fullWidth
        scroll="paper" // El scroll se hace dentro del cuadro de diálogo, no en la página entera
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" fontWeight="bold" component="span">
            {noviaSeleccionada?.nombre}
          </Typography>
          <IconButton onClick={handleCloseModal} sx={{ color: 'grey.500' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ backgroundColor: '#faf9f7' }}>
          <Stack spacing={3}>
            {noviaSeleccionada?.galeria.map((imgUrl, idx) => (
              <Box 
                key={idx}
                component="img"
                src={imgUrl}
                alt={`${noviaSeleccionada?.nombre} - Foto ${idx + 1}`}
                sx={{ 
                  width: '100%', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}

export default App;
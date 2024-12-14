import React from 'react'

import MuniLogo from '../assets/icono.png'

import ig from '../assets/Instagram-Logosu.png'
import fb from '../assets/Facebook-logo-icon-circle-2.png'
import tw from '../assets/Twitter_X.png'

export const Footer = () => {
  return (
    <footer className='layout_footer'>
        <div className='layout_footer__links'>
            <img className='logo' src={MuniLogo} alt='logo' />
            <h1 className='footer'>MuniDenuncia</h1>
            <h1 className='footer2'>MuniDenuncia es una aplicación diseñada para facilitar la denuncia ciudadana ante las municipalidades. 
                Permite a los usuarios reportar problemas o incidentes en su comunidad de forma rápida y eficiente, mejorando la comunicación y resolución de los problemas 
                locales.
            </h1>
            <nav className='nav'>
            <ul >
                <li className="title">Siguenos</li>
                <img className='redesig' src={ig} alt='redesig' />
                <img className='redes' src={fb} alt='redes' />
                <img className='redes' src={tw} alt='redes' />
            </ul>
            <ul>
                <li className="title">MuniDenuncia</li>
                <li><a href="/denuncias">Denuncias</a></li>
                <li><a href="/denuncias/reportar">Reportar Denuncia</a></li>
                <li><a href="/denuncias/estado">Estado de Denuncias</a></li>
                <li><a href="/denuncias/historial">Historial de Denuncias</a></li>
            </ul>
            <ul>
                <li className="title">Acerca de</li>
                <li><a href="/acerca">Acerca de MuniDenuncia</a></li>
                <li><a href="/acerca/funcionamiento">Cómo Funciona</a></li>
                <li><a href="/acerca/privacidad">Política de Privacidad</a></li>
                <li><a href="/acerca/terminos">Términos de Uso</a></li>
            </ul>
            <ul>
                <li className="title">Servicios Municipales</li>
                <li><a href="/servicios">Servicios Públicos</a></li>
                <li><a href="/servicios/horarios">Horarios de Atención</a></li>
                <li><a href="/servicios/ubicacion">Ubicación de Oficinas</a></li>
            </ul>
            <ul>
                <li className="title">Comunidad</li>
                <li><a href="/comunidad/foro">Foro Ciudadano</a></li>
                <li><a href="/comunidad/eventos">Eventos Locales</a></li>
                <li><a href="/comunidad/voluntariado">Oportunidades de Voluntariado</a></li>
            </ul>
            <ul>
                <li className="title">Seguridad</li>
                <li><a href="/seguridad">Información de Seguridad</a></li>
                <li><a href="/seguridad/policia">Contactar a la Policía</a></li>
                <li><a href="/seguridad/emergencias">Números de Emergencia</a></li>
            </ul>
            <ul>
                <li className="title">Contacto</li>
                <li><a href="/contacto">Contáctanos</a></li>
                <li><a href="/contacto/soporte">Soporte Técnico</a></li>
                <li><a href="/contacto/sugerencias">Enviar Sugerencias</a></li>
            </ul>
        </nav>
            
        </div>
        

    </footer>
  )
}
 
export default Footer
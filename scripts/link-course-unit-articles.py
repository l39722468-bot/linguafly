#!/usr/bin/env python3
"""Enlaza guías curso-a1/curso-a2 con artículos temáticos similares (ida y vuelta)."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BLOG = ROOT / "src/content/blog"

# slug -> list of (path without .md, anchor title)
A1_LINKS: dict[str, list[tuple[str, str]]] = {
    "unidad-1-saludos-presentarse": [
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
        ("gramatica/fonetica-inglesa-basica", "Fonética inglesa básica"),
    ],
    "unidad-2-to-be-pronombres-nacionalidades": [
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
        ("metodos/ingles-a1-vs-a2", "Inglés A1 vs A2"),
    ],
    "unidad-3-to-be-negativa-preguntas": [
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
        ("gramatica/fonetica-inglesa-basica", "Fonética inglesa básica"),
    ],
    "unidad-4-articulos-plurales-demostrativos": [
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-5-present-simple-rutinas": [
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-6-familia-posesivos-genitivo": [
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
    ],
    "unidad-7-colores-descripciones-fisicas": [
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
    ],
    "unidad-8-numeros-edad-precios": [
        ("viajes/ingles-para-compras", "Inglés para compras"),
        ("viajes/ingles-mercados-regateo-viaje", "Inglés en mercados y regateo"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-9-profesiones-ocupaciones": [
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
        ("trabajo/ingles-para-trabajo", "Inglés para el trabajo"),
    ],
    "unidad-10-rutinas-diarias-hora": [
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-11-lugares-ciudad": [
        ("gramatica/preposiciones-movimiento-ingles", "Preposiciones de movimiento"),
        ("viajes/ingles-para-viajar", "Inglés para viajar"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-12-dias-semana": [
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
        ("curso-a2/unidad-8-preposiciones-tiempo-at-on-in", "A2 U8 — Preposiciones de tiempo (at/on/in)"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-13-rutina-diaria": [
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
        ("gramatica/phrasal-verbs-principiantes", "Phrasal verbs para principiantes"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-14-present-simple-dont-do-you": [
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-15-present-simple-doesnt-does": [
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
        ("gramatica/pronunciacion-ed-s-ingles", "Pronunciación de -ed y -s"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-16-cafeteria-can-i-have-id-like": [
        ("gramatica/can-could-ingles", "Can / Could en inglés"),
        ("viajes/ingles-restaurantes-bares-viaje", "Inglés en restaurantes y bares"),
        ("trabajo/ingles-para-camareros-y-hosteleria", "Inglés para camareros y hostelería"),
    ],
    "unidad-17-comidas-breakfast-lunch-dinner": [
        ("viajes/ingles-en-la-cocina", "Inglés en la cocina"),
        ("viajes/ingles-restaurantes-bares-viaje", "Inglés en restaurantes y bares"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-18-gustos-like-ing-because": [
        ("metodos/ingles-para-deportes", "Inglés para deportes"),
        ("viajes/ingles-playas-deportes-acuaticos", "Inglés en playas y deportes acuáticos"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-19-meses-fechas-cumpleanos": [
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
        ("curso-a2/unidad-8-preposiciones-tiempo-at-on-in", "A2 U8 — Preposiciones de tiempo (at/on/in)"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-20-repaso-modulo-2": [
        ("viajes/ingles-restaurantes-bares-viaje", "Inglés en restaurantes y bares"),
        ("gramatica/can-could-ingles", "Can / Could en inglés"),
        ("viajes/ingles-en-la-cocina", "Inglés en la cocina"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-21-habitaciones-casa": [
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
    ],
    "unidad-22-muebles-posesivos-mine-yours": [
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-23-there-is-there-are": [
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
        ("gramatica/preposiciones-movimiento-ingles", "Preposiciones de movimiento"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-24-preposiciones-lugar-next-to-between": [
        ("gramatica/preposiciones-movimiento-ingles", "Preposiciones de movimiento"),
        ("viajes/ingles-para-viajar", "Inglés para viajar"),
        ("curso-a2/unidad-9-preposiciones-lugar-movimiento", "A2 U9 — Preposiciones de lugar y movimiento"),
    ],
    "unidad-25-barrio-the-a-an-some-any": [
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
        ("viajes/ingles-para-viajar", "Inglés para viajar"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-26-direcciones-imperativos": [
        ("gramatica/preposiciones-movimiento-ingles", "Preposiciones de movimiento"),
        ("viajes/ingles-para-viajar", "Inglés para viajar"),
        ("viajes/ingles-trenes-metro-transporte", "Inglés en trenes y metro"),
    ],
    "unidad-27-mascotas-animales": [
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
    ],
    "unidad-28-partes-cuerpo-have-got": [
        ("trabajo/ingles-para-salud", "Inglés para salud"),
        ("trabajo/vocabulario-ingles-medico-enfermeria", "Vocabulario médico y enfermería"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-29-ropa-present-continuous": [
        ("metodos/vocabulario-ropa-ingles", "Vocabulario de ropa en inglés"),
        ("viajes/ingles-para-compras", "Inglés para compras"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-30-repaso-modulo-3": [
        ("gramatica/preposiciones-movimiento-ingles", "Preposiciones de movimiento"),
        ("metodos/vocabulario-ropa-ingles", "Vocabulario de ropa en inglés"),
        ("trabajo/ingles-para-salud", "Inglés para salud"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-31-can-habilidad": [
        ("gramatica/can-could-ingles", "Can / Could en inglés"),
        ("gramatica/verbos-modales-ingles-guia", "Verbos modales: guía"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-32-deportes-hobbies-play-go-do": [
        ("metodos/ingles-para-deportes", "Inglés para deportes"),
        ("viajes/ingles-playas-deportes-acuaticos", "Inglés en playas y deportes acuáticos"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-33-adverbios-frecuencia": [
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-34-and-but-because": [
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-35-free-time-activities": [
        ("metodos/ingles-para-deportes", "Inglés para deportes"),
        ("viajes/ingles-playas-deportes-acuaticos", "Inglés en playas y deportes acuáticos"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-36-instrumentos-musicales": [
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
        ("gramatica/can-could-ingles", "Can / Could en inglés"),
    ],
    "unidad-37-talent-skills": [
        ("gramatica/can-could-ingles", "Can / Could en inglés"),
        ("gramatica/verbos-modales-ingles-guia", "Verbos modales: guía"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-38-pedir-permiso": [
        ("gramatica/can-could-ingles", "Can / Could en inglés"),
        ("gramatica/may-might-ingles", "May / Might en inglés"),
        ("gramatica/verbos-modales-ingles-guia", "Verbos modales: guía"),
    ],
    "unidad-39-outdoor-activities": [
        ("viajes/mochileros-ingles-naturaleza-senderismo-seguridad", "Inglés para naturaleza y senderismo"),
        ("viajes/ingles-playas-deportes-acuaticos", "Inglés en playas y deportes acuáticos"),
        ("metodos/ingles-para-deportes", "Inglés para deportes"),
    ],
    "unidad-40-repaso-modulo-4": [
        ("gramatica/can-could-ingles", "Can / Could en inglés"),
        ("metodos/ingles-para-deportes", "Inglés para deportes"),
        ("gramatica/may-might-ingles", "May / Might en inglés"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-41-aeropuerto-must-should": [
        ("viajes/mochileros-ingles-fronteras-aeropuertos-aduanas", "Inglés en aeropuertos y aduanas"),
        ("viajes/ingles-vuelos-retrasos-conexiones", "Inglés en vuelos y conexiones"),
        ("gramatica/must-have-to-diferencia", "Must vs have to"),
        ("gramatica/should-would-ingles", "Should / Would en inglés"),
    ],
    "unidad-42-transporte-by-take-the": [
        ("viajes/ingles-trenes-metro-transporte", "Inglés en trenes y metro"),
        ("viajes/mochileros-ingles-hostels-transporte-publico", "Hostels y transporte público"),
        ("viajes/ingles-alquiler-coche", "Inglés para alquiler de coche"),
        ("gramatica/phrasal-verbs-with-take", "Phrasal verbs with take"),
    ],
    "unidad-43-verbos-viaje-horarios": [
        ("viajes/ingles-para-viajar", "Inglés para viajar"),
        ("viajes/ingles-trenes-metro-transporte", "Inglés en trenes y metro"),
        ("viajes/curso-de-ingles-para-viajar", "Curso de inglés para viajar"),
    ],
    "unidad-44-tiempo-atmosferico": [
        ("viajes/ingles-para-viajar", "Inglés para viajar"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-45-estaciones-in-spring": [
        ("viajes/ingles-para-viajar", "Inglés para viajar"),
        ("curso-a2/unidad-8-preposiciones-tiempo-at-on-in", "A2 U8 — Preposiciones de tiempo (at/on/in)"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-46-hotel-can-i-have": [
        ("viajes/vocabulario-hotel-ingles", "Vocabulario de hotel en inglés"),
        ("viajes/ingles-airbnb-alojamiento-alternativo", "Inglés para Airbnb y alojamiento"),
        ("viajes/ingles-para-recepcionistas-guia", "Inglés para recepcionistas"),
        ("gramatica/can-could-ingles", "Can / Could en inglés"),
    ],
    "unidad-47-vacaciones-was-were": [
        ("gramatica/past-simple-usos-reglas", "Past Simple: usos y reglas"),
        ("gramatica/errores-tiempos-pasado-espanoles", "Errores de tiempos de pasado"),
        ("viajes/ingles-para-viajar", "Inglés para viajar"),
        ("curso-a2/unidad-2-past-simple-verbos-regulares", "A2 U2 — Past Simple regulares"),
    ],
    "unidad-48-sightseeing-superlativos": [
        ("viajes/ingles-museos-turismo-cultural", "Inglés en museos y turismo cultural"),
        ("viajes/ingles-para-viajar", "Inglés para viajar"),
        ("curso-a2/unidad-6-superlativos-est-the-most", "A2 U6 — Superlativos"),
    ],
    "unidad-49-maleta-need-to": [
        ("gramatica/semi-modales-ingles", "Semi-modales en inglés"),
        ("viajes/ingles-para-viajar", "Inglés para viajar"),
        ("viajes/ingles-vuelos-retrasos-conexiones", "Inglés en vuelos y conexiones"),
    ],
    "unidad-50-repaso-modulo-5": [
        ("viajes/ingles-para-viajar", "Inglés para viajar"),
        ("viajes/vocabulario-hotel-ingles", "Vocabulario de hotel en inglés"),
        ("viajes/ingles-trenes-metro-transporte", "Inglés en trenes y metro"),
        ("gramatica/past-simple-usos-reglas", "Past Simple: usos y reglas"),
    ],
    "unidad-51-supermercado-plurales": [
        ("viajes/ingles-para-compras", "Inglés para compras"),
        ("viajes/ingles-mercados-regateo-viaje", "Inglés en mercados y regateo"),
        ("viajes/ingles-en-la-cocina", "Inglés en la cocina"),
    ],
    "unidad-52-contables-incontables": [
        ("viajes/ingles-para-compras", "Inglés para compras"),
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
        ("viajes/ingles-en-la-cocina", "Inglés en la cocina"),
    ],
    "unidad-53-some-any": [
        ("viajes/ingles-para-compras", "Inglés para compras"),
        ("viajes/ingles-en-la-cocina", "Inglés en la cocina"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-54-how-much-how-many": [
        ("viajes/ingles-para-compras", "Inglés para compras"),
        ("viajes/ingles-mercados-regateo-viaje", "Inglés en mercados y regateo"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-55-tienda-ropa-too-enough": [
        ("metodos/vocabulario-ropa-ingles", "Vocabulario de ropa en inglés"),
        ("viajes/ingles-para-compras", "Inglés para compras"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-56-restaurante-pedidos": [
        ("viajes/ingles-restaurantes-bares-viaje", "Inglés en restaurantes y bares"),
        ("trabajo/ingles-para-camareros-y-hosteleria", "Inglés para camareros y hostelería"),
        ("viajes/ingles-en-la-cocina", "Inglés en la cocina"),
    ],
    "unidad-57-cocina-recetas": [
        ("viajes/ingles-en-la-cocina", "Inglés en la cocina"),
        ("viajes/ingles-restaurantes-bares-viaje", "Inglés en restaurantes y bares"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-58-salud-should": [
        ("gramatica/should-would-ingles", "Should / Would en inglés"),
        ("trabajo/ingles-para-salud", "Inglés para salud"),
        ("trabajo/vocabulario-ingles-medico-enfermeria", "Vocabulario médico y enfermería"),
        ("viajes/frases-ingles-emergencias-viajes", "Frases de emergencias en viajes"),
    ],
    "unidad-59-dinero-pay-for-spend-on": [
        ("viajes/ingles-para-compras", "Inglés para compras"),
        ("viajes/ingles-mercados-regateo-viaje", "Inglés en mercados y regateo"),
        ("metodos/ingles-a1", "Inglés A1: guía para empezar"),
    ],
    "unidad-60-repaso-modulo-6": [
        ("viajes/ingles-para-compras", "Inglés para compras"),
        ("viajes/ingles-restaurantes-bares-viaje", "Inglés en restaurantes y bares"),
        ("viajes/ingles-en-la-cocina", "Inglés en la cocina"),
        ("gramatica/should-would-ingles", "Should / Would en inglés"),
    ],
}

A2_LINKS: dict[str, list[tuple[str, str]]] = {
    "unidad-1-saludos-introducciones-repaso": [
        ("metodos/ingles-a2", "Inglés A2: guía del nivel"),
        ("metodos/ingles-a1-vs-a2", "Inglés A1 vs A2"),
        ("curso-a1/unidad-1-saludos-presentarse", "A1 U1 — Saludos y presentarse"),
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
    ],
    "unidad-2-past-simple-verbos-regulares": [
        ("gramatica/past-simple-usos-reglas", "Past Simple: usos y reglas"),
        ("gramatica/errores-tiempos-pasado-espanoles", "Errores de tiempos de pasado"),
        ("gramatica/pronunciacion-ed-s-ingles", "Pronunciación de -ed y -s"),
        ("curso-a1/unidad-47-vacaciones-was-were", "A1 U47 — Vacaciones: was/were"),
    ],
    "unidad-3-past-simple-verbos-irregulares": [
        ("gramatica/past-simple-verbos-irregulares", "Past Simple: verbos irregulares"),
        ("gramatica/past-simple-usos-reglas", "Past Simple: usos y reglas"),
        ("gramatica/errores-tiempos-pasado-espanoles", "Errores de tiempos de pasado"),
    ],
    "unidad-4-wh-questions-past-simple": [
        ("gramatica/past-simple-usos-reglas", "Past Simple: usos y reglas"),
        ("gramatica/past-simple-vs-past-continuous", "Past Simple vs Past Continuous"),
        ("gramatica/past-simple-verbos-irregulares", "Past Simple: verbos irregulares"),
    ],
    "unidad-5-comparativos-er-more-than": [
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
        ("gramatica/gramatica-ingles-b1-guia", "Gramática inglesa B1"),
        ("curso-a1/unidad-48-sightseeing-superlativos", "A1 U48 — Sightseeing y superlativos"),
    ],
    "unidad-6-superlativos-est-the-most": [
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
        ("viajes/ingles-museos-turismo-cultural", "Inglés en museos y turismo cultural"),
        ("curso-a1/unidad-48-sightseeing-superlativos", "A1 U48 — Sightseeing y superlativos"),
    ],
    "unidad-7-adverbios-modo-ly": [
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
        ("metodos/ingles-a2", "Inglés A2: guía del nivel"),
    ],
    "unidad-8-preposiciones-tiempo-at-on-in": [
        ("gramatica/gramatica-inglesa-guia", "Gramática inglesa: guía por niveles"),
        ("curso-a1/unidad-12-dias-semana", "A1 U12 — Días de la semana"),
        ("curso-a1/unidad-19-meses-fechas-cumpleanos", "A1 U19 — Meses, fechas y cumpleaños"),
        ("metodos/ingles-a2", "Inglés A2: guía del nivel"),
    ],
    "unidad-9-preposiciones-lugar-movimiento": [
        ("gramatica/preposiciones-movimiento-ingles", "Preposiciones de movimiento"),
        ("viajes/ingles-para-viajar", "Inglés para viajar"),
        ("curso-a1/unidad-24-preposiciones-lugar-next-to-between", "A1 U24 — Preposiciones de lugar"),
    ],
    "unidad-10-repaso-modulo-1": [
        ("gramatica/past-simple-usos-reglas", "Past Simple: usos y reglas"),
        ("gramatica/past-simple-verbos-irregulares", "Past Simple: verbos irregulares"),
        ("gramatica/preposiciones-movimiento-ingles", "Preposiciones de movimiento"),
        ("metodos/ingles-a2", "Inglés A2: guía del nivel"),
    ],
    "unidad-11-present-perfect-introduccion": [
        ("gramatica/present-perfect-usos-principales", "Present Perfect: usos principales"),
        ("gramatica/present-perfect-vs-past-simple", "Present Perfect vs Past Simple"),
        ("gramatica/past-simple-verbos-irregulares", "Past Simple: verbos irregulares"),
    ],
    "unidad-12-present-perfect-ever-never": [
        ("gramatica/present-perfect-ever-never", "Present Perfect: ever / never"),
        ("gramatica/present-perfect-usos-principales", "Present Perfect: usos principales"),
        ("gramatica/present-perfect-vs-past-simple", "Present Perfect vs Past Simple"),
    ],
    "unidad-13-present-perfect-already-yet": [
        ("gramatica/present-perfect-just-already-yet", "Present Perfect: just / already / yet"),
        ("gramatica/present-perfect-usos-principales", "Present Perfect: usos principales"),
        ("gramatica/present-perfect-ever-never", "Present Perfect: ever / never"),
    ],
    "unidad-14-present-perfect-just": [
        ("gramatica/present-perfect-just-already-yet", "Present Perfect: just / already / yet"),
        ("gramatica/present-perfect-usos-principales", "Present Perfect: usos principales"),
        ("gramatica/present-perfect-ever-never", "Present Perfect: ever / never"),
        ("gramatica/present-perfect-vs-past-simple", "Present Perfect vs Past Simple"),
    ],
    "unidad-15-present-perfect-vs-past-simple": [
        ("gramatica/present-perfect-vs-past-simple", "Present Perfect vs Past Simple"),
        ("gramatica/present-perfect-usos-principales", "Present Perfect: usos principales"),
        ("gramatica/past-simple-usos-reglas", "Past Simple: usos y reglas"),
        ("gramatica/present-perfect-ever-never", "Present Perfect: ever / never"),
    ],
    "unidad-16-past-continuous": [
        ("gramatica/past-simple-vs-past-continuous", "Past Simple vs Past Continuous"),
        ("gramatica/past-simple-usos-reglas", "Past Simple: usos y reglas"),
        ("gramatica/errores-tiempos-pasado-espanoles", "Errores de tiempos de pasado"),
        ("gramatica/present-perfect-vs-past-simple", "Present Perfect vs Past Simple"),
    ],
    "unidad-17-past-simple-past-continuous": [
        ("gramatica/past-simple-vs-past-continuous", "Past Simple vs Past Continuous"),
        ("gramatica/past-simple-usos-reglas", "Past Simple: usos y reglas"),
        ("gramatica/errores-tiempos-pasado-espanoles", "Errores de tiempos de pasado"),
        ("curso-a2/unidad-16-past-continuous", "A2 U16 — Past Continuous"),
    ],
    "unidad-18-for-since": [
        ("gramatica/present-perfect-since-for", "Present Perfect: since / for"),
        ("gramatica/present-perfect-usos-principales", "Present Perfect: usos principales"),
        ("gramatica/present-perfect-vs-past-simple", "Present Perfect vs Past Simple"),
        ("gramatica/present-perfect-just-already-yet", "Present Perfect: just / already / yet"),
    ],
}

# topic article path -> list of (course unit path, title) reverse links
REVERSE: dict[str, list[tuple[str, str]]] = {
    "gramatica/past-simple-usos-reglas": [
        ("curso-a2/unidad-2-past-simple-verbos-regulares", "A2 U2 — Past Simple regulares"),
        ("curso-a2/unidad-3-past-simple-verbos-irregulares", "A2 U3 — Past Simple irregulares"),
        ("curso-a2/unidad-4-wh-questions-past-simple", "A2 U4 — Wh-questions en Past Simple"),
        ("curso-a1/unidad-47-vacaciones-was-were", "A1 U47 — Vacaciones: was/were"),
    ],
    "gramatica/past-simple-verbos-irregulares": [
        ("curso-a2/unidad-3-past-simple-verbos-irregulares", "A2 U3 — Past Simple irregulares"),
        ("curso-a2/unidad-2-past-simple-verbos-regulares", "A2 U2 — Past Simple regulares"),
    ],
    "gramatica/errores-tiempos-pasado-espanoles": [
        ("curso-a2/unidad-2-past-simple-verbos-regulares", "A2 U2 — Past Simple regulares"),
        ("curso-a2/unidad-3-past-simple-verbos-irregulares", "A2 U3 — Past Simple irregulares"),
    ],
    "gramatica/pronunciacion-ed-s-ingles": [
        ("curso-a2/unidad-2-past-simple-verbos-regulares", "A2 U2 — Past Simple regulares"),
        ("curso-a1/unidad-15-present-simple-doesnt-does", "A1 U15 — Present Simple: doesn't / does"),
    ],
    "gramatica/present-perfect-usos-principales": [
        ("curso-a2/unidad-11-present-perfect-introduccion", "A2 U11 — Present Perfect: Introducción"),
        ("curso-a2/unidad-12-present-perfect-ever-never", "A2 U12 — Ever & Never"),
        ("curso-a2/unidad-13-present-perfect-already-yet", "A2 U13 — Already & Yet"),
        ("curso-a2/unidad-14-present-perfect-just", "A2 U14 — Just"),
        ("curso-a2/unidad-15-present-perfect-vs-past-simple", "A2 U15 — Present Perfect vs Past Simple"),
        ("curso-a2/unidad-18-for-since", "A2 U18 — For & Since"),
    ],
    "gramatica/present-perfect-since-for": [
        ("curso-a2/unidad-18-for-since", "A2 U18 — For & Since"),
        ("curso-a2/unidad-11-present-perfect-introduccion", "A2 U11 — Present Perfect: Introducción"),
        ("curso-a2/unidad-15-present-perfect-vs-past-simple", "A2 U15 — Present Perfect vs Past Simple"),
    ],
    "gramatica/present-perfect-ever-never": [
        ("curso-a2/unidad-12-present-perfect-ever-never", "A2 U12 — Ever & Never"),
        ("curso-a2/unidad-11-present-perfect-introduccion", "A2 U11 — Present Perfect: Introducción"),
    ],
    "gramatica/present-perfect-just-already-yet": [
        ("curso-a2/unidad-14-present-perfect-just", "A2 U14 — Just"),
        ("curso-a2/unidad-13-present-perfect-already-yet", "A2 U13 — Already & Yet"),
        ("curso-a2/unidad-12-present-perfect-ever-never", "A2 U12 — Ever & Never"),
        ("curso-a2/unidad-11-present-perfect-introduccion", "A2 U11 — Present Perfect: Introducción"),
    ],
    "gramatica/present-perfect-vs-past-simple": [
        ("curso-a2/unidad-15-present-perfect-vs-past-simple", "A2 U15 — Present Perfect vs Past Simple"),
        ("curso-a2/unidad-11-present-perfect-introduccion", "A2 U11 — Present Perfect: Introducción"),
        ("curso-a2/unidad-2-past-simple-verbos-regulares", "A2 U2 — Past Simple regulares"),
        ("curso-a2/unidad-3-past-simple-verbos-irregulares", "A2 U3 — Past Simple irregulares"),
    ],
    "gramatica/can-could-ingles": [
        ("curso-a1/unidad-31-can-habilidad", "A1 U31 — Can: habilidad"),
        ("curso-a1/unidad-16-cafeteria-can-i-have-id-like", "A1 U16 — Pedir en la cafetería"),
        ("curso-a1/unidad-38-pedir-permiso", "A1 U38 — Pedir permiso"),
        ("curso-a1/unidad-46-hotel-can-i-have", "A1 U46 — Hotel: Can I have…?"),
    ],
    "gramatica/verbos-modales-ingles-guia": [
        ("curso-a1/unidad-31-can-habilidad", "A1 U31 — Can: habilidad"),
        ("curso-a1/unidad-38-pedir-permiso", "A1 U38 — Pedir permiso"),
        ("curso-a1/unidad-58-salud-should", "A1 U58 — Salud: should"),
    ],
    "gramatica/should-would-ingles": [
        ("curso-a1/unidad-58-salud-should", "A1 U58 — Salud: should"),
        ("curso-a1/unidad-41-aeropuerto-must-should", "A1 U41 — Aeropuerto: must / should"),
    ],
    "gramatica/must-have-to-diferencia": [
        ("curso-a1/unidad-41-aeropuerto-must-should", "A1 U41 — Aeropuerto: must / should"),
    ],
    "gramatica/may-might-ingles": [
        ("curso-a1/unidad-38-pedir-permiso", "A1 U38 — Pedir permiso"),
    ],
    "gramatica/preposiciones-movimiento-ingles": [
        ("curso-a2/unidad-9-preposiciones-lugar-movimiento", "A2 U9 — Preposiciones de lugar y movimiento"),
        ("curso-a1/unidad-24-preposiciones-lugar-next-to-between", "A1 U24 — Preposiciones de lugar"),
        ("curso-a1/unidad-26-direcciones-imperativos", "A1 U26 — Direcciones e imperativos"),
    ],
    "gramatica/semi-modales-ingles": [
        ("curso-a1/unidad-49-maleta-need-to", "A1 U49 — Maleta: need to"),
    ],
    "viajes/ingles-para-viajar": [
        ("curso-a1/unidad-41-aeropuerto-must-should", "A1 U41 — Aeropuerto"),
        ("curso-a1/unidad-42-transporte-by-take-the", "A1 U42 — Transporte"),
        ("curso-a1/unidad-46-hotel-can-i-have", "A1 U46 — Hotel"),
        ("curso-a1/unidad-50-repaso-modulo-5", "A1 U50 — Repaso viaje"),
    ],
    "viajes/ingles-para-compras": [
        ("curso-a1/unidad-51-supermercado-plurales", "A1 U51 — Supermercado"),
        ("curso-a1/unidad-54-how-much-how-many", "A1 U54 — How much / How many"),
        ("curso-a1/unidad-55-tienda-ropa-too-enough", "A1 U55 — Tienda de ropa"),
        ("curso-a1/unidad-8-numeros-edad-precios", "A1 U8 — Números, edad y precios"),
    ],
    "viajes/ingles-restaurantes-bares-viaje": [
        ("curso-a1/unidad-56-restaurante-pedidos", "A1 U56 — Restaurante: pedidos"),
        ("curso-a1/unidad-16-cafeteria-can-i-have-id-like", "A1 U16 — Pedir en la cafetería"),
        ("curso-a1/unidad-17-comidas-breakfast-lunch-dinner", "A1 U17 — Comidas del día"),
    ],
    "viajes/ingles-en-la-cocina": [
        ("curso-a1/unidad-57-cocina-recetas", "A1 U57 — Cocina y recetas"),
        ("curso-a1/unidad-17-comidas-breakfast-lunch-dinner", "A1 U17 — Comidas del día"),
    ],
    "viajes/vocabulario-hotel-ingles": [
        ("curso-a1/unidad-46-hotel-can-i-have", "A1 U46 — Hotel: Can I have…?"),
    ],
    "viajes/ingles-trenes-metro-transporte": [
        ("curso-a1/unidad-42-transporte-by-take-the", "A1 U42 — Transporte"),
        ("curso-a1/unidad-43-verbos-viaje-horarios", "A1 U43 — Verbos de viaje"),
    ],
    "viajes/mochileros-ingles-fronteras-aeropuertos-aduanas": [
        ("curso-a1/unidad-41-aeropuerto-must-should", "A1 U41 — Aeropuerto: must / should"),
    ],
    "viajes/ingles-museos-turismo-cultural": [
        ("curso-a1/unidad-48-sightseeing-superlativos", "A1 U48 — Sightseeing y superlativos"),
        ("curso-a2/unidad-6-superlativos-est-the-most", "A2 U6 — Superlativos"),
    ],
    "metodos/vocabulario-ropa-ingles": [
        ("curso-a1/unidad-29-ropa-present-continuous", "A1 U29 — Ropa y Present Continuous"),
        ("curso-a1/unidad-55-tienda-ropa-too-enough", "A1 U55 — Tienda de ropa"),
    ],
    "metodos/ingles-para-deportes": [
        ("curso-a1/unidad-32-deportes-hobbies-play-go-do", "A1 U32 — Deportes y hobbies"),
        ("curso-a1/unidad-35-free-time-activities", "A1 U35 — Free time activities"),
    ],
    "trabajo/ingles-para-salud": [
        ("curso-a1/unidad-58-salud-should", "A1 U58 — Salud: should"),
        ("curso-a1/unidad-28-partes-cuerpo-have-got", "A1 U28 — Partes del cuerpo"),
    ],
    "trabajo/ingles-para-camareros-y-hosteleria": [
        ("curso-a1/unidad-56-restaurante-pedidos", "A1 U56 — Restaurante: pedidos"),
        ("curso-a1/unidad-16-cafeteria-can-i-have-id-like", "A1 U16 — Pedir en la cafetería"),
    ],
    "gramatica/past-simple-vs-past-continuous": [
        ("curso-a2/unidad-17-past-simple-past-continuous", "A2 U17 — Past Simple + Past Continuous"),
        ("curso-a2/unidad-16-past-continuous", "A2 U16 — Past Continuous"),
        ("curso-a2/unidad-4-wh-questions-past-simple", "A2 U4 — Wh-questions en Past Simple"),
        ("curso-a2/unidad-2-past-simple-verbos-regulares", "A2 U2 — Past Simple regulares"),
    ],
}


def href(path: str) -> str:
    return f"/blog/{path}"


def update_related_routes(text: str, paths: list[str]) -> str:
    """Replace or insert related_routes with topical slugs (keep up to 4)."""
    slugs = [p.split("/", 1)[1] for p in paths[:4]]
    block = "related_routes:\n" + "".join(f"  - {s}\n" for s in slugs)
    if re.search(r"^related_routes:\n(?:  - .+\n)+", text, flags=re.M):
        return re.sub(r"^related_routes:\n(?:  - .+\n)+", block, text, count=1, flags=re.M)
    # insert after keywords or before faqs/excerpt/---
    return re.sub(
        r"(^keywords:\n(?:  - .+\n)+)",
        r"\1" + block,
        text,
        count=1,
        flags=re.M,
    )


def build_guides_block(links: list[tuple[str, str]]) -> str:
    lines = ["Guías relacionadas:", ""]
    for path, title in links:
        lines.append(f"- [{title}]({href(path)})")
    return "\n".join(lines) + "\n"


def update_unit_article(path: Path, links: list[tuple[str, str]]) -> bool:
    text = path.read_text(encoding="utf-8")
    original = text

    # Verify all targets exist
    good = []
    for p, title in links:
        if (BLOG / f"{p}.md").exists():
            good.append((p, title))
    if not good:
        return False

    text = update_related_routes(text, [p for p, _ in good])

    marker = "Guías relacionadas:"
    if marker in text:
        # Tolerar línea en blanco tras el encabezado y enlaces /blog o /curso-*
        pattern = r"Guías relacionadas:\n+(?:- \[.*?\]\(.*?\)\n)+"
        text2, n = re.subn(pattern, build_guides_block(good) + "\n", text, count=1)
        if n:
            text = text2
        else:
            # Fallback: sustituir desde el marcador hasta --- o ## Fuentes
            text = re.sub(
                r"Guías relacionadas:\n.*?(?=\n---\n|\n## Fuentes)",
                build_guides_block(good) + "\n",
                text,
                count=1,
                flags=re.S,
            )
    else:
        # Insert before ## Fuentes
        block = "\n" + build_guides_block(good) + "\n"
        if "## Fuentes" in text:
            text = text.replace("## Fuentes", block + "## Fuentes", 1)
        else:
            text = text.rstrip() + "\n" + block

    if text != original:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def update_reverse_article(path: Path, links: list[tuple[str, str]]) -> bool:
    text = path.read_text(encoding="utf-8")
    original = text
    good = [(p, t) for p, t in links if (BLOG / f"{p}.md").exists()]
    if not good:
        return False

    section_title = "## Practica en el curso Linguafly"
    bullets = "\n".join(f"- [{t}]({href(p)})" for p, t in good)
    section = (
        f"{section_title}\n\n"
        "Si estás siguiendo el curso por unidades, estas guías conectan este tema con la práctica guiada:\n\n"
        f"{bullets}\n"
    )

    if section_title in text:
        # Replace existing section until next ## or end
        text = re.sub(
            rf"{re.escape(section_title)}\n.*?(?=\n## |\Z)",
            section.rstrip() + "\n\n",
            text,
            count=1,
            flags=re.S,
        )
    elif "## Fuentes" in text:
        text = text.replace("## Fuentes", section + "\n## Fuentes", 1)
    else:
        text = text.rstrip() + "\n\n" + section

    if text != original:
        path.write_text(text, encoding="utf-8")
        return True
    return False


A1_HUB_SECTION = """
## 8. Guías del curso A1 (unidad a unidad)

Si quieres estudiar el A1 con el mismo orden del [curso A1](/curso-a1), estas guías del blog acompañan cada unidad:

**Módulo 1 — Identidad y bases**

- [U1 — Saludos y presentarse](/blog/curso-a1/unidad-1-saludos-presentarse)
- [U2 — To be, pronombres y nacionalidades](/blog/curso-a1/unidad-2-to-be-pronombres-nacionalidades)
- [U3 — To be: negativa y preguntas](/blog/curso-a1/unidad-3-to-be-negativa-preguntas)
- [U4 — Artículos, plurales y demostrativos](/blog/curso-a1/unidad-4-articulos-plurales-demostrativos)
- [U5 — Present Simple: rutinas](/blog/curso-a1/unidad-5-present-simple-rutinas)
- [U6 — Familia y posesivos](/blog/curso-a1/unidad-6-familia-posesivos-genitivo)
- [U7 — Colores y descripciones](/blog/curso-a1/unidad-7-colores-descripciones-fisicas)
- [U8 — Números, edad y precios](/blog/curso-a1/unidad-8-numeros-edad-precios)
- [U9 — Profesiones](/blog/curso-a1/unidad-9-profesiones-ocupaciones)

**Módulo 2 — Rutinas, ciudad y comida**

- [U10 — Rutinas diarias y la hora](/blog/curso-a1/unidad-10-rutinas-diarias-hora)
- [U11 — Lugares de la ciudad](/blog/curso-a1/unidad-11-lugares-ciudad)
- [U12 — Días de la semana](/blog/curso-a1/unidad-12-dias-semana)
- [U13 — Rutina diaria](/blog/curso-a1/unidad-13-rutina-diaria)
- [U14 — Present Simple: don't / Do you…?](/blog/curso-a1/unidad-14-present-simple-dont-do-you)
- [U15 — Present Simple: doesn't / Does…?](/blog/curso-a1/unidad-15-present-simple-doesnt-does)
- [U16 — Cafetería: Can I have / I'd like](/blog/curso-a1/unidad-16-cafeteria-can-i-have-id-like)
- [U17 — Comidas del día](/blog/curso-a1/unidad-17-comidas-breakfast-lunch-dinner)
- [U18 — Gustos: like + -ing](/blog/curso-a1/unidad-18-gustos-like-ing-because)
- [U19 — Meses, fechas y cumpleaños](/blog/curso-a1/unidad-19-meses-fechas-cumpleanos)
- [U20 — Repaso Módulo 2](/blog/curso-a1/unidad-20-repaso-modulo-2)

**Módulo 3 — Casa, barrio y descripciones**

- [U21 — Habitaciones de la casa](/blog/curso-a1/unidad-21-habitaciones-casa)
- [U22 — Muebles y posesivos](/blog/curso-a1/unidad-22-muebles-posesivos-mine-yours)
- [U23 — There is / There are](/blog/curso-a1/unidad-23-there-is-there-are)
- [U24 — Preposiciones de lugar](/blog/curso-a1/unidad-24-preposiciones-lugar-next-to-between)
- [U25 — El barrio: a/an/some/any](/blog/curso-a1/unidad-25-barrio-the-a-an-some-any)
- [U26 — Direcciones e imperativos](/blog/curso-a1/unidad-26-direcciones-imperativos)
- [U27 — Mascotas y animales](/blog/curso-a1/unidad-27-mascotas-animales)
- [U28 — Partes del cuerpo: have got](/blog/curso-a1/unidad-28-partes-cuerpo-have-got)
- [U29 — Ropa y Present Continuous](/blog/curso-a1/unidad-29-ropa-present-continuous)
- [U30 — Repaso Módulo 3](/blog/curso-a1/unidad-30-repaso-modulo-3)

**Módulo 4 — Habilidades y tiempo libre**

- [U31 — Can: habilidad](/blog/curso-a1/unidad-31-can-habilidad)
- [U32 — Deportes y hobbies](/blog/curso-a1/unidad-32-deportes-hobbies-play-go-do)
- [U33 — Adverbios de frecuencia](/blog/curso-a1/unidad-33-adverbios-frecuencia)
- [U34 — And, but, because](/blog/curso-a1/unidad-34-and-but-because)
- [U35 — Free time activities](/blog/curso-a1/unidad-35-free-time-activities)
- [U36 — Instrumentos musicales](/blog/curso-a1/unidad-36-instrumentos-musicales)
- [U37 — Talent & skills](/blog/curso-a1/unidad-37-talent-skills)
- [U38 — Pedir permiso](/blog/curso-a1/unidad-38-pedir-permiso)
- [U39 — Outdoor activities](/blog/curso-a1/unidad-39-outdoor-activities)
- [U40 — Repaso Módulo 4](/blog/curso-a1/unidad-40-repaso-modulo-4)

**Módulo 5 — Viajes**

- [U41 — Aeropuerto: must / should](/blog/curso-a1/unidad-41-aeropuerto-must-should)
- [U42 — Transporte](/blog/curso-a1/unidad-42-transporte-by-take-the)
- [U43 — Verbos de viaje y horarios](/blog/curso-a1/unidad-43-verbos-viaje-horarios)
- [U44 — El tiempo atmosférico](/blog/curso-a1/unidad-44-tiempo-atmosferico)
- [U45 — Estaciones](/blog/curso-a1/unidad-45-estaciones-in-spring)
- [U46 — Hotel: Can I have…?](/blog/curso-a1/unidad-46-hotel-can-i-have)
- [U47 — Vacaciones: was/were](/blog/curso-a1/unidad-47-vacaciones-was-were)
- [U48 — Sightseeing y superlativos](/blog/curso-a1/unidad-48-sightseeing-superlativos)
- [U49 — Maleta: need to](/blog/curso-a1/unidad-49-maleta-need-to)
- [U50 — Repaso Módulo 5](/blog/curso-a1/unidad-50-repaso-modulo-5)

**Módulo 6 — Compras, comida, salud y dinero**

- [U51 — Supermercado y plurales](/blog/curso-a1/unidad-51-supermercado-plurales)
- [U52 — Contables e incontables](/blog/curso-a1/unidad-52-contables-incontables)
- [U53 — Some / any](/blog/curso-a1/unidad-53-some-any)
- [U54 — How much / How many](/blog/curso-a1/unidad-54-how-much-how-many)
- [U55 — Tienda de ropa: too / enough](/blog/curso-a1/unidad-55-tienda-ropa-too-enough)
- [U56 — Restaurante: pedidos](/blog/curso-a1/unidad-56-restaurante-pedidos)
- [U57 — Cocina y recetas](/blog/curso-a1/unidad-57-cocina-recetas)
- [U58 — Salud: should](/blog/curso-a1/unidad-58-salud-should)
- [U59 — Dinero: pay for / spend on](/blog/curso-a1/unidad-59-dinero-pay-for-spend-on)
- [U60 — Repaso Módulo 6](/blog/curso-a1/unidad-60-repaso-modulo-6)

Índice completo de guías: [Curso A1 en el blog](/blog/curso-a1).
""".strip() + "\n"


def update_a1_hub() -> bool:
    path = BLOG / "metodos/ingles-a1.md"
    text = path.read_text(encoding="utf-8")
    if "Guías del curso A1" in text:
        # Replace existing section
        text2 = re.sub(
            r"## \d+\. Guías del curso A1.*?(?=\n---\n|\n## Fuentes|\Z)",
            A1_HUB_SECTION + "\n",
            text,
            count=1,
            flags=re.S,
        )
        if text2 == text:
            return False
        path.write_text(text2, encoding="utf-8")
        return True

    if "## Fuentes" in text:
        text = text.replace("## Fuentes", A1_HUB_SECTION + "\n---\n\n## Fuentes", 1)
    else:
        text = text.rstrip() + "\n\n" + A1_HUB_SECTION
    path.write_text(text, encoding="utf-8")
    return True


def main() -> None:
    updated_units = 0
    for slug, links in A1_LINKS.items():
        p = BLOG / "curso-a1" / f"{slug}.md"
        if not p.exists():
            print("MISSING A1", slug)
            continue
        if update_unit_article(p, links):
            updated_units += 1

    for slug, links in A2_LINKS.items():
        p = BLOG / "curso-a2" / f"{slug}.md"
        if not p.exists():
            print("MISSING A2", slug)
            continue
        if update_unit_article(p, links):
            updated_units += 1

    updated_reverse = 0
    for rel, links in REVERSE.items():
        p = BLOG / f"{rel}.md"
        if not p.exists():
            print("MISSING TOPIC", rel)
            continue
        if update_reverse_article(p, links):
            updated_reverse += 1

    hub = update_a1_hub()
    print(f"units_updated={updated_units}")
    print(f"reverse_updated={updated_reverse}")
    print(f"a1_hub_updated={hub}")
    print(f"a1_mapped={len(A1_LINKS)} a2_mapped={len(A2_LINKS)} reverse_mapped={len(REVERSE)}")


if __name__ == "__main__":
    main()

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import planningAnimation from "../assets/animations/planning-animation.json"; // Vous devrez ajouter ce fichier

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden">
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/10 rounded-full blur-xl"
            style={{
              width: Math.random() * 400 + 100 + "px",
              height: Math.random() * 400 + 100 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              transform: "translate(-50%, -50%)",
              animation: `float ${Math.random() * 10 + 20}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* Contenu principal */}
      <div className="flex-grow relative z-10">
        {/* Header */}
        <header className="relative z-10">
          <nav className="container mx-auto px-6 py-6">
            <div className="flex justify-between items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2"
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-2xl font-bold text-white">
                  SmartPlanning AI
                </span>
              </motion.div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-blue-100 transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Essai Gratuit
                </Link>
              </div>
            </div>
          </nav>
        </header>

        {/* Hero Section avec Lottie */}
        <main className="relative z-10 container mx-auto px-6 pt-20 pb-32">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-8">
                <span className="block">Planifiez Intelligemment</span>
                <span className="block mt-2 text-blue-200">avec l'IA</span>
              </h1>
              <p className="text-xl text-blue-100 mb-12 max-w-2xl">
                Optimisez la gestion de vos équipes grâce à notre solution
                innovante de planning propulsée par l'intelligence artificielle.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/register"
                    className="inline-block bg-gradient-to-r from-blue-400 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-300"
                  >
                    Commencer Gratuitement
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/contact"
                    className="inline-block bg-white/10 backdrop-blur-lg text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
                  >
                    Demander une Démo
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Animation Lottie */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="lg:w-1/2 mt-12 lg:mt-0"
            >
              <div className="lottie-container">
                <Lottie
                  animationData={planningAnimation}
                  className="w-full max-w-2xl mx-auto"
                  loop={true}
                  autoplay={true}
                  rendererSettings={{
                    preserveAspectRatio: "xMidYMid slice",
                  }}
                  style={{
                    filter: "hue-rotate(45deg)", // Ajuste la couleur pour correspondre à votre thème
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              {
                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
                title: "Planning Intelligent",
                description:
                  "IA prédictive pour optimiser les emplois du temps",
              },
              {
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                title: "Analyses Avancées",
                description: "Tableaux de bord et rapports détaillés",
              },
              {
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                title: "Gestion d'Équipe",
                description: "Coordination efficace des ressources",
              },
              {
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                title: "Performance",
                description: "Solution rapide et fiable",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-lg p-6 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
              >
                <svg
                  className="w-10 h-10 mb-4 text-blue-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={feature.icon}
                  />
                </svg>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-blue-100">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: "98%", label: "Satisfaction Client" },
              { number: "24/7", label: "Support Disponible" },
              { number: "50K+", label: "Utilisateurs Actifs" },
              { number: "30%", label: "Gain de Productivité" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center bg-white/10 backdrop-blur-lg rounded-xl p-6"
              >
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </main>
      </div>

      {/* Footer amélioré */}
      <footer className="relative z-20 w-full bg-gradient-to-r from-blue-900/80 to-indigo-900/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-12">
          {/* Vagues décoratives */}
          <div className="absolute top-0 left-0 w-full transform -translate-y-full">
            <svg className="w-full h-8" viewBox="0 0 1440 48" fill="none">
              <path
                d="M0 48h1440V0C1440 0 1320 24 1200 24C1080 24 960 0 840 0C720 0 600 24 480 24C360 24 240 0 120 0C60 0 0 12 0 12v36z"
                fill="currentColor"
                className="text-blue-900/80"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">SmartPlanning AI</h3>
              <p className="text-blue-100">
                Solution intelligente de gestion de planning propulsée par l'IA
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                Liens Rapides
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/login"
                    className="text-blue-100 hover:text-white transition-colors duration-300"
                  >
                    Connexion
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-blue-100 hover:text-white transition-colors duration-300"
                  >
                    Inscription
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Légal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/privacy"
                    className="text-blue-100 hover:text-white transition-colors duration-300"
                  >
                    Confidentialité
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-blue-100 hover:text-white transition-colors duration-300"
                  >
                    Conditions d'utilisation
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Contact</h3>
              <div className="space-y-2">
                <p className="text-blue-100">
                  <span className="block">Email:</span>
                  contact@smartplanning.ai
                </p>
                <Link
                  to="/contact"
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-blue-100">
              © 2024 SmartPlanning AI - Tous droits réservés
            </p>
            <div className="flex space-x-6">
              {/* Icônes de réseaux sociaux */}
              {["twitter", "linkedin", "github"].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com/smartplanning`}
                  className="text-blue-100 hover:text-white transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{social}</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {/* Ajoutez les paths appropriés pour chaque icône */}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            <span className="block">Politique de</span>
            <span className="block text-indigo-600">Confidentialité</span>
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Dernière mise à jour : {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Contenu Principal */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="p-8 lg:p-12">
            {/* Navigation rapide */}
            <div className="mb-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Navigation Rapide
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Collecte des Données",
                  "Utilisation",
                  "Base Légale",
                  "Vos Droits",
                  "Contact DPO",
                ].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{item}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-12">
              <section
                id="collecte-des-données"
                className="transition-all duration-300 hover:bg-gray-50 rounded-xl p-6"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-indigo-600 mr-4">01</span>
                  Collecte des Données Personnelles
                </h2>
                <div className="prose prose-indigo max-w-none">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Nous collectons les données suivantes :
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      "Nom et prénom",
                      "Adresse email professionnelle",
                      "Données de connexion et d'utilisation",
                      "Informations relatives aux horaires de travail",
                    ].map((item) => (
                      <li key={item} className="flex items-start">
                        <svg
                          className="w-6 h-6 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section
                id="utilisation"
                className="transition-all duration-300 hover:bg-gray-50 rounded-xl p-6"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-indigo-600 mr-4">02</span>
                  Utilisation des Données
                </h2>
                <div className="prose prose-indigo max-w-none">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Vos données sont utilisées pour :
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      "Gérer votre compte utilisateur",
                      "Fournir les services de planification",
                      "Générer des statistiques anonymisées",
                      "Assurer la sécurité de nos services",
                    ].map((item) => (
                      <li key={item} className="flex items-start">
                        <svg
                          className="w-6 h-6 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section
                id="base-légale"
                className="transition-all duration-300 hover:bg-gray-50 rounded-xl p-6"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-indigo-600 mr-4">03</span>
                  Base Légale du Traitement
                </h2>
                <div className="prose prose-indigo max-w-none">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Conformément à l'article 6 du RGPD, nous traitons vos
                    données sur les bases légales suivantes :
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      "Exécution du contrat de service",
                      "Consentement pour les fonctionnalités optionnelles",
                      "Obligations légales (droit du travail)",
                      "Intérêt légitime pour l'amélioration des services",
                    ].map((item) => (
                      <li key={item} className="flex items-start">
                        <svg
                          className="w-6 h-6 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section
                id="vos-droits"
                className="transition-all duration-300 hover:bg-gray-50 rounded-xl p-6"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-indigo-600 mr-4">04</span>
                  Vos Droits
                </h2>
                <div className="prose prose-indigo max-w-none">
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Conformément au RGPD, vous disposez des droits suivants :
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      "Droit d'accès à vos données",
                      "Droit de rectification",
                      "Droit à l'effacement (droit à l'oubli)",
                      "Droit à la portabilité des données",
                      "Droit d'opposition au traitement",
                      "Droit à la limitation du traitement",
                    ].map((item) => (
                      <li key={item} className="flex items-start">
                        <svg
                          className="w-6 h-6 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section
                id="contact-dpo"
                className="transition-all duration-300 hover:bg-gray-50 rounded-xl p-6"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-indigo-600 mr-4">05</span>
                  Contact DPO
                </h2>
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <p className="text-gray-600 text-lg mb-4">
                    Pour exercer vos droits ou pour toute question, contactez
                    notre Délégué à la Protection des Données :
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3 text-gray-700">
                      <svg
                        className="w-6 h-6 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span>dpo@smartplanning.ai</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-700">
                      <svg
                        className="w-6 h-6 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>[Adresse de l'entreprise]</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

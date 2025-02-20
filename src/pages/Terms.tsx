import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            <span className="block">Conditions Générales</span>
            <span className="block text-indigo-600">d'Utilisation</span>
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
                  "Objet",
                  "Mentions Légales",
                  "Accès au Service",
                  "Propriété Intellectuelle",
                  "Responsabilités",
                  "Droit Applicable",
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
                id="objet"
                className="transition-all duration-300 hover:bg-gray-50 rounded-xl p-6"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-indigo-600 mr-4">01</span>
                  Objet
                </h2>
                <div className="prose prose-indigo max-w-none">
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Les présentes CGU régissent l'utilisation du service
                      SmartPlanning AI, une solution innovante de gestion de
                      planning et de temps de travail. En utilisant notre
                      service, vous acceptez d'être lié par ces conditions.
                    </p>
                  </div>
                </div>
              </section>

              <section
                id="mentions-légales"
                className="transition-all duration-300 hover:bg-gray-50 rounded-xl p-6"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-indigo-600 mr-4">02</span>
                  Mentions Légales
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-3 mb-4">
                      <svg
                        className="w-8 h-8 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Société
                      </h3>
                    </div>
                    <p className="text-gray-600">SmartPlanning AI</p>
                    <p className="text-gray-600">SIRET : [Numéro SIRET]</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-3 mb-4">
                      <svg
                        className="w-8 h-8 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Direction
                      </h3>
                    </div>
                    <p className="text-gray-600">
                      Directeur de la publication : [Nom]
                    </p>
                    <p className="text-gray-600">Siège social : [Adresse]</p>
                  </div>
                </div>
              </section>

              <section
                id="accès-au-service"
                className="transition-all duration-300 hover:bg-gray-50 rounded-xl p-6"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-indigo-600 mr-4">03</span>
                  Accès au Service
                </h2>
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Le service est accessible 24h/24, 7j/7, sauf en cas de
                    maintenance ou de force majeure. L'utilisateur doit disposer
                    d'une connexion internet et d'un navigateur compatible.
                  </p>
                </div>
              </section>

              <section
                id="propriété-intellectuelle"
                className="transition-all duration-300 hover:bg-gray-50 rounded-xl p-6"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-indigo-600 mr-4">04</span>
                  Propriété Intellectuelle
                </h2>
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    L'ensemble des éléments du service (logiciels, textes,
                    images, etc.) sont protégés par le droit de la propriété
                    intellectuelle.
                  </p>
                </div>
              </section>

              <section
                id="responsabilités"
                className="transition-all duration-300 hover:bg-gray-50 rounded-xl p-6"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-indigo-600 mr-4">05</span>
                  Responsabilités
                </h2>
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    L'utilisateur est responsable de la confidentialité de ses
                    identifiants et de l'usage qu'il fait du service.
                  </p>
                </div>
              </section>

              <section
                id="droit-applicable"
                className="transition-all duration-300 hover:bg-gray-50 rounded-xl p-6"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-indigo-600 mr-4">06</span>
                  Droit Applicable
                </h2>
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Les présentes CGU sont soumises au droit français. Tout
                    litige relève de la compétence exclusive des tribunaux
                    français. En cas de litige, une solution amiable sera
                    recherchée avant toute action judiciaire.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Footer avec CTA */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-gray-600">
            Des questions sur nos conditions d'utilisation ?
          </p>
          <div className="space-x-4">
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300"
            >
              Nous contacter
            </Link>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-300"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;

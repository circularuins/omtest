(ns omtest.routes.home
            (:require [omtest.layout :as layout]
                      [omtest.util :as util]
                      [compojure.core :refer :all]
                      [noir.response :refer [edn]]
                      [clojure.pprint :refer [pprint]]))

(defn home-page []
      (layout/render
        "app.html" {:docs (util/md->html "/md/docs.md")}))

(defn hello-page []
      (layout/render
        "hello.html"))

(defn save-document [doc]
      (pprint doc)
      {:status "ok"})

(defroutes home-routes
  (GET "/" [] (home-page))
  (GET "/hello" [] (hello-page))
  (POST "/save" {:keys [body-params]}
    (edn (save-document body-params))))

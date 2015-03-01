(ns helloom.core
  (:require [reagent.core :as reagent :refer [atom]]
            [secretary.core :as secretary]
            [reagent-forms.core :refer [bind-fields]]
            [ajax.core :refer [POST]]
            [om.core :as om :include-macros true]
            [om.dom :as dom :include-macros true])
  (:require-macros [secretary.core :refer [defroute]]))

(def app-state (atom {:text "Hello OM!!"}))

(om/root
 (fn [app owner]
   (reify om/IRender
     (render [_]
       (dom/h1 nil (:text app)))))
 app-state
 {:target (. js/document (getElementById "app"))})

(defn ^:export hello[]
  (.write js/document "<p>Hello, ClojureScript!</p>"))

(defn ^:export fact[]
  (.write js/document (map (fn [n] (* n n)) [1 2 3 4 5])))

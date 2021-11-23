// libs
import { useLocation, Navigate } from 'react-router-dom';
// store hooks
import { useAppSelector } from 'application/hooks';
// selectors
import { getCurrentExplore } from 'application/selectors/explore';
// components
import StopScrollOnArtworkPageOverlay from 'components/StopScrollOnArtworkPageOverlay';
import MosaicFiltersBar from './MosaicFiltersBar';
import ProjectsWithInfiniteScrollMosaic from './Projects/ProjectsWithInfiniteScroll';
import ProjectsWithoutInfiniteScrollMosaic from './Projects/ProjectsWithoutInfiniteScroll';

const Mosaic = () => {
  const currentExplore = useAppSelector(getCurrentExplore);
  const { pathname, search, state } = useLocation();
  return (
    <StopScrollOnArtworkPageOverlay>
      <div>
        <MosaicFiltersBar />
        {/* important de vérifier si pathname contient "artwork" afin d'adapter ce qui doit être rendu: */}
        {/artwork/.test(pathname) ? (
          // vérifier présence d'un state dans location permet de déterminer si la présence de "artwork" dans pathname est dû à navigation depuis mosaïque
          state ? (
            currentExplore === 'community' ? (
              <ProjectsWithoutInfiniteScrollMosaic />
            ) : (
              <ProjectsWithInfiniteScrollMosaic />
            )
          ) : // si "artwork" n'apparaît pas dans pathname, signifie soit que user a hard refresh soit que demande de page artwork directement entrée dans barre url
          // auquel cas rendre null et ainsi éviter que soit call quelque useEffect et fetch que se soit par souci de performance
          null
        ) : // si pathname ne contient pas "artwork" alors vérifier si query string dont dépend fetch de projets conforme aux attentes
        // dans le même temps est vérifier si présence de query string pour rediriger dans le cas de initial render
        /^\?sort_by=(community|trending|latest|following)(&dimension=(2|3)d)?$/.test(
            search
          ) ? (
          // si query string présent et conforme rendre composant qui fetch les projets enveloppé ou pas de infinite scroll HOC selon valeur de explore
          currentExplore === 'community' ? (
            <ProjectsWithoutInfiniteScrollMosaic />
          ) : (
            <ProjectsWithInfiniteScrollMosaic />
          )
        ) : (
          // si pas de query string rediriger
          // si précédente page était mosaïque rediriger en accord avec précédentes valeurs de explore et de dimension
          <Navigate to="/?sort_by=community" />
        )}
      </div>
    </StopScrollOnArtworkPageOverlay>
  );
};

export default Mosaic;

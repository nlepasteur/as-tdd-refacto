// libs
import { useContext } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
// components
import ArtworkContextProvider, {
  ArtworkContext,
  toggleLikesModal,
} from './ArtworkContextProvider';
import StopScrollOnArtworkPageOverlayAntagonist from 'components/StopScrollOnArtworkPageOverlayAntagonist';

const Artwork = () => {
  const { dispatch, showLikesModal } = useContext(ArtworkContext);
  const { state } = useLocation();
  const { id } = useParams();
  return (
    <ArtworkContextProvider>
      <StopScrollOnArtworkPageOverlayAntagonist>
        <div>
          <button onClick={() => dispatch(toggleLikesModal())}>
            toggle likes modal
          </button>
          {showLikesModal ? <div>LikesModals</div> : null}
          <Link to={state ? state.from : '/some/user'}>leave artwork {id}</Link>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
            quisquam eveniet! Voluptate, mollitia sapiente! Dolor velit, quaerat
            ex aut blanditiis voluptatibus, qui quisquam nostrum nam dignissimos
            consectetur. Facere enim repellendus quaerat incidunt odio illum
            temporibus ratione eum, fugit nesciunt, maxime quasi, consequatur
            delectus officia aut! Molestias vitae quidem, reprehenderit veniam
            id eum in quaerat dolorum mollitia tempore ipsa amet porro facilis
            cumque nulla perferendis rerum quod blanditiis, repudiandae incidunt
            reiciendis obcaecati non. Praesentium nostrum eius impedit ut
            debitis mollitia. Iure, sapiente. At itaque libero tempora minima,
            voluptate numquam autem corporis dolore maxime repudiandae optio
            culpa dignissimos distinctio inventore sint expedita impedit placeat
            non animi alias natus? Ipsum rerum consequuntur sapiente quae ea
            nihil error! Magni laboriosam maxime velit fugiat. Quos, porro
            quaerat dolore ipsam perferendis illum ratione voluptatum incidunt
            adipisci! Doloremque quam numquam dolore beatae modi! Veritatis
            delectus id nisi at perferendis voluptate dolorum incidunt,
            praesentium, tempora assumenda nam asperiores, rerum molestiae
            facilis doloremque provident reiciendis ad doloribus! Expedita ut
            deserunt et cumque, at repellendus sequi suscipit culpa quidem
            eveniet incidunt saepe beatae maiores! Dignissimos accusantium sunt
            fuga possimus perferendis enim, ipsa cumque aliquid consequuntur
            rerum iusto et velit vitae reprehenderit, ipsam adipisci. Unde
            corrupti consequuntur ipsum qui quae ex error tempora ratione hic!
            Aperiam, illum harum beatae, mollitia ipsum culpa neque fugiat atque
            nam tenetur quasi veritatis ipsa reiciendis pariatur distinctio!
            Commodi ad voluptatibus facere deserunt. Error itaque temporibus
            ratione libero voluptatum dolorum ipsa, inventore, dignissimos autem
            harum accusamus rem quod natus possimus consequatur maiores, sit
            distinctio? Magni, sit molestias voluptatem praesentium quas labore
            quam doloribus illum consequatur nesciunt iusto porro, culpa sequi
            voluptate voluptatibus cupiditate, nobis fugit quisquam? Quibusdam
            doloribus temporibus ratione debitis fuga vero neque natus, alias
            quae deleniti a aut doloremque incidunt adipisci porro sapiente quam
            eaque quas ipsam, aperiam nemo recusandae molestias nulla! Quisquam,
            enim praesentium! Dolore est qui doloremque expedita? Eius, commodi
            placeat. Laboriosam dolorum tenetur blanditiis. Explicabo quas ab
            veritatis architecto aspernatur! Vel aut nobis recusandae ut illum
            numquam maiores consectetur, deserunt nesciunt libero dolorum
            molestiae similique voluptas hic minus dolores ipsa magni assumenda
            nostrum adipisci error rem suscipit! Laborum veniam totam quod
            soluta dolores maxime ea ut et. Sapiente provident delectus
            voluptates ducimus dolor incidunt enim obcaecati tempore molestias
            est, natus, aliquam pariatur! Reiciendis doloremque sint autem
            aliquid perferendis repudiandae. Incidunt recusandae laudantium
            dolores modi iste minima repellat minus soluta vel dolorum, eum
            voluptatibus impedit voluptate culpa rerum quasi distinctio quae
            mollitia qui odio reiciendis. Accusantium non, officiis earum magnam
            similique pariatur modi nostrum. Repellat accusamus aut eaque
            praesentium cupiditate, reprehenderit laborum harum sit dolorem
            dolorum dicta ut quisquam obcaecati suscipit vero. Fuga asperiores
            dolore, expedita magni tempore rerum laudantium eaque laborum
            pariatur beatae eveniet quidem tenetur at quaerat mollitia. Qui
            provident eius perferendis. Impedit aspernatur explicabo, repellat
            ut earum neque quisquam sunt voluptate laborum maxime, quia vel
            pariatur esse dolorum ratione amet ipsam totam suscipit animi magnam
            quos obcaecati. Nam a est blanditiis reiciendis ratione quae tempore
            similique reprehenderit aut. Numquam adipisci recusandae molestiae
            vero maiores neque quisquam sunt quos quam, in, autem veritatis iure
            odit vitae, eligendi veniam consequatur harum ab iste nesciunt
            distinctio? Voluptatibus reiciendis maiores placeat? Quis
            praesentium molestias placeat omnis ab nam velit repellat dolorem ad
            eius, rem, asperiores vitae deserunt porro! Inventore, voluptatibus.
            Mollitia laudantium quod, earum illum nam molestias neque odit
            recusandae quisquam, perferendis impedit asperiores alias quibusdam,
            quae dolore quia illo vero dolorum amet debitis aut adipisci
            inventore. Vel distinctio quia excepturi, cumque ipsum odit ex
            maxime aspernatur possimus facilis a qui magnam nesciunt magni!
            Corrupti aut expedita non reprehenderit porro dolore nisi tempora,
            explicabo, facilis dicta exercitationem rem ea repellat blanditiis
            quasi mollitia laborum reiciendis, fuga quae laboriosam harum hic.
            Accusamus nam vero explicabo sed quibusdam voluptas ex libero
            dolore? Velit repellat ad esse ea nemo eveniet beatae necessitatibus
            id tempora. Rem sapiente aut sint quo mollitia fugiat pariatur
            eligendi facere molestias porro voluptas repellendus, quos unde!
            Consequatur quis illo error minima aperiam cumque suscipit esse
            quibusdam incidunt rem placeat sint pariatur ut quae deleniti, et
            eum id. Pariatur, possimus quibusdam iure dolorum beatae nam vel
            consectetur quo. Et aut, corporis explicabo sapiente hic magni.
            Excepturi eaque amet consectetur repellendus delectus quos molestias
            odit nesciunt laudantium facere temporibus nam deserunt voluptates
            distinctio hic culpa fugit accusantium corporis labore impedit
            maiores id, suscipit quaerat non. Debitis, cumque est iure culpa
            obcaecati corporis rem nesciunt. Culpa pariatur exercitationem
            sapiente fugit magni voluptatem. Ipsa inventore tenetur quasi, ut
            obcaecati quas quaerat est laudantium repudiandae iste? Esse
            consequatur reiciendis corrupti necessitatibus quasi sed. Molestiae
            quia voluptatum nisi officiis. Ex, sit voluptatem quisquam hic minus
            voluptatibus excepturi repellat obcaecati aliquid reprehenderit
            consequuntur sunt debitis minima quos vel! Nihil libero quam ea
            dolore iure saepe nostrum. Quos ad praesentium, qui fugiat eveniet
            nostrum sit ipsam tempore vero ea repellendus tempora aliquam earum,
            dignissimos nulla asperiores neque voluptatibus amet ipsa aperiam
            sunt quo quod. Ipsa nulla, aspernatur ducimus architecto cupiditate
            sunt sed facere illum, odio, suscipit aperiam inventore eius eos
            harum nam! Dignissimos repudiandae doloremque cumque magni aliquam
            eos aut voluptas incidunt dolores voluptatibus. Nihil voluptas
            dolores quis aliquid voluptate labore quas aliquam similique
            temporibus officiis saepe mollitia, unde doloremque hic asperiores
            maxime natus debitis, laboriosam assumenda voluptatem odit! Tempore
            vitae voluptatum quis? Sequi corrupti provident eius, totam
            laboriosam voluptatem? Reiciendis voluptate mollitia illo obcaecati,
            harum, hic, quisquam sint facilis architecto nihil explicabo
            doloremque! Animi, reprehenderit non blanditiis ullam ad, eligendi
            esse pariatur cumque temporibus iste omnis. Rem nam, quod voluptatum
            mollitia incidunt adipisci pariatur fugit. Cumque provident
            similique voluptatem quibusdam possimus quas quo ut nihil voluptatum
            ipsam perspiciatis repudiandae odit, placeat amet nobis labore
            aliquam ea suscipit totam, quos sit! Minus consectetur inventore
            dolores molestias distinctio quas dicta, iure dolore dignissimos non
            veniam provident exercitationem hic veritatis corporis quos, alias
            tempore officiis! Doloremque facilis veritatis commodi a vitae
            excepturi eaque enim adipisci voluptate quisquam! Blanditiis
            reprehenderit voluptatibus enim a. Eaque rem tempora sed fugit
            suscipit, asperiores similique, eos possimus exercitationem dicta,
            praesentium vel. Repellendus, laboriosam autem nesciunt, aperiam
            nobis minima iste labore quo aspernatur itaque recusandae alias cum
            reprehenderit amet officiis quae dicta. Cum impedit, optio
            praesentium eius eos recusandae voluptates ullam quae natus nulla
            vel quos, tempora est? Aliquid voluptates eum aliquam rerum, aut
            sequi impedit dicta illum, id mollitia tenetur autem libero
            assumenda reiciendis quam eveniet aperiam, sed vitae nihil quasi!
            Tempore magni sequi amet molestias iure temporibus, sit quod rerum,
            maiores, velit aliquam doloribus illo exercitationem harum. Et
            provident magni placeat odit repellat reiciendis architecto harum,
            quia perferendis sint cumque porro voluptatibus beatae aliquid iusto
            similique mollitia quae! Voluptatum accusantium ea, officiis autem
            nobis illum similique debitis minus libero, ratione exercitationem
            vel necessitatibus recusandae magni incidunt praesentium cupiditate
            alias dicta voluptate inventore quod ex consequatur perspiciatis.
            Officiis tempore doloribus quibusdam assumenda explicabo architecto
            aspernatur nulla, ex adipisci dolore. Magni sequi possimus quia quos
            officiis eius, esse corporis facilis provident dignissimos quod
            accusamus eveniet delectus, laudantium molestias atque non autem.
            Dolore voluptate cupiditate at nihil amet ex eaque animi non iusto
            quas enim accusamus assumenda aliquid molestiae eos deleniti,
            adipisci quam aspernatur est id mollitia sed! Magnam quos eum
            necessitatibus numquam dicta perspiciatis, at, temporibus quod
            tempore vel, voluptas impedit dolor provident! Magni ad vel quae
            excepturi optio corporis, voluptas, sunt natus distinctio dolore
            asperiores dicta dolor.
          </div>
        </div>
      </StopScrollOnArtworkPageOverlayAntagonist>
    </ArtworkContextProvider>
  );
};

export default Artwork;

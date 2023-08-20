"use client";
import Image from 'next/image';
import styles from './page.module.css';
import { MDBCarousel, MDBCarouselItem, MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';

export default function Home() {

  return (
    <>
      <div className="home-container">

        {/* carousel */}
        <MDBCarousel showControls dealy={1000}>
        <MDBCarouselItem
          className='w-100 d-block'
          itemId={1}
          src='https://mdbootstrap.com/img/new/slides/041.jpg'
          alt='...'
        />
        <MDBCarouselItem
          className='w-100 d-block'
          itemId={2}
          src='https://mdbootstrap.com/img/new/slides/042.jpg'
          alt='...'
        />
        <MDBCarouselItem
          className='w-100 d-block'
          itemId={3}
          src='https://mdbootstrap.com/img/new/slides/043.jpg'
          alt='...'
        />
        </MDBCarousel>
        {/* ---------- */}
        <h1 className="home-heading">Welcome to Our Website</h1>
        <p className="home-subheading">Discover the Best Products and Services</p>
        <div className="featured-products">
          <div className="product-card">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-product-cards/img1.webp" alt="Product 1" className="product-image" />
            <h2 className="product-title">Product 1</h2>
            <p className="product-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat metus ut elit blandit, et tempus felis feugiat.</p>
          </div>
          <div className="product-card">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-product-cards/img2.webp" alt="Product 2" className="product-image" />
            <h2 className="product-title">Product 2</h2>
            <p className="product-description">Vestibulum feugiat rutrum ligula, ut eleifend quam tristique ut. Mauris tristique, lectus sit amet aliquam placerat, velit nisl efficitur erat, ac faucibus turpis nunc id justo.</p>
          </div>
          <div className="product-card">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-product-cards/img3.webp" alt="Product 3" className="product-image" />
            <h2 className="product-title">Product 3</h2>
            <p className="product-description">Etiam eu elit est. Nulla facilisi. Nullam sed sollicitudin tortor, id facilisis neque. Suspendisse non orci nec purus ullamcorper eleifend vel et arcu.</p>
          </div>
        </div><br /><hr />

        <MDBAccordion initialActive={1}>
          <h1 className="home-heading">FAQ</h1>
            <MDBAccordionItem collapseId={1} headerTitle='Accordion Item #1'>
              <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse
              plugin adds the appropriate classes that we use to style each element. These classes control the overall
              appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with
              custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go
              within the <code>.accordion-body</code>, though the transition does limit overflow.
            </MDBAccordionItem>
            <MDBAccordionItem collapseId={2} headerTitle='Accordion Item #2'>
              <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse
              plugin adds the appropriate classes that we use to style each element. These classes control the overall
              appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with
              custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go
              within the <code>.accordion-body</code>, though the transition does limit overflow.
            </MDBAccordionItem>
            <MDBAccordionItem collapseId={3} headerTitle='Accordion Item #3'>
              <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse
              plugin adds the appropriate classes that we use to style each element. These classes control the overall
              appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with
              custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go
              within the <code>.accordion-body</code>, though the transition does limit overflow.
            </MDBAccordionItem>
        </MDBAccordion>

      </div>
    </>

  )
}

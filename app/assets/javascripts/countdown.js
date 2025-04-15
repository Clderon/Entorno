//= require countdown
//= require_tree .

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Function to check if element is in viewport
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  // Function to handle scroll animations
  const handleScrollAnimations = () => {
    const animatedElements = document.querySelectorAll(
      ".hero__image-container, .hero__decoration, .team-card, .team__header"
    );

    animatedElements.forEach((element) => {
      if (isInViewport(element) && !element.classList.contains("animated")) {
        element.classList.add("animated");
        element.style.opacity = "1";
        element.style.transform = "scale(1)";
      }
    });
  };

  // Add hover effect to navigation items
  const navLinks = document.querySelectorAll(
    ".nav__link, .team-card__social-link"
  );
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      link.style.color = "var(--color-primary)";
    });

    link.addEventListener("mouseleave", () => {
      link.style.color = "";
    });
  });

  // Add hover effect to buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });

  // Add interactive effect to hero images
  const heroImages = document.querySelectorAll(
    ".hero__image, .team-card__image"
  );
  heroImages.forEach((image) => {
    image.addEventListener("mouseenter", () => {
      image.style.transform = "scale(1.01)";
    });

    image.addEventListener("mouseleave", () => {
      image.style.transform = "";
    });
  });

  // Initialize scroll animations
  window.addEventListener("scroll", handleScrollAnimations);
  handleScrollAnimations(); // Run once on page load

  // Simulate loading state for demonstration
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 300);
});

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="bg-gradient-to-b from-white to-gray-50 px-4 py-16 antialiased dark:from-gray-900 dark:to-gray-800"
    >
      <div className="mx-auto max-w-screen-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto grid rounded-2xl bg-white shadow-xl dark:bg-gray-800 lg:grid-cols-12 lg:gap-8 lg:p-16 xl:gap-16"
        >
          <div className="lg:col-span-5 p-8 lg:p-0">
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden w-full h-auto dark:block"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
              alt="MyInventory Dashboard Dark"
            />
          </div>
          <div className="p-8 lg:col-span-7 lg:p-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
                Tentang{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-500">
                  MyInventory
                </span>
              </h1>
              <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
                MyInventory adalah solusi manajemen inventaris modern yang
                dirancang untuk memudahkan pengelolaan dan peminjaman barang.
                Dengan antarmuka yang intuitif dan fitur-fitur canggih, kami
                membantu Anda mengoptimalkan pengelolaan aset.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

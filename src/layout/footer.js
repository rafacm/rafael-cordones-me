import Link from 'next/link'

const Footer = ({ children }) => {
  return (
    <div className="gradient mt-6 pb-6">
      <footer className="flex flex-col items-center">
        <div className="sm:w-2/3 text-center">
          <p className="text-sm">© 2021 rafael cordones</p>
        </div>
        {children}
        <div className="flex flex-row items-center mt-4">
          <div className="mx-4">
            <Link href="https://firmen.wko.at/rafael-cordones-marcos%2c-msc/wien/?firmaid=ea70a605-c16a-4275-be2d-06827fdae484">
              <a>
                Impressum
              </a>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer

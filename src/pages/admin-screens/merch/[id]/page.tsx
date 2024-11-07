import ProductCard from '@/components/ProductCard';
import UnderlinedText from '@/components/decorators/UnderlinedText';
import ProductCheckout from './ProductCheckout';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

const Page = async ({ params }: { params: { id: string } }) => {
  const currentProduct = await prisma.dues.findUnique({
    where: {
      id: params.id,
    },
  });

  const products = await prisma.dues.findMany({
    where: {
      isArchived: false,
      id: { not: params.id },
    },
  });

  if (!currentProduct || currentProduct.isArchived) return notFound();

  return (
    <div>
      <div className="px-3 md:px-7 my-20">
        <ProductCheckout product={currentProduct} />

        <h1 className="text-3xl text-center mt-20 mb-10 font-bold tracking-tight">
          More product from{' '}
          <UnderlinedText className="decoration-wavy underline-offset-8">
            OnlyHorse
          </UnderlinedText>
        </h1>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Page;

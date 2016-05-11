#include <iostream>
#include "OneR.h"
#include "Instance.h"
#include "Instances.h"
/* run this program using the console pauser or add your own getch, system("pause") or input loop */
int main(int argc, char** argv) {
	OneR test;
	Instance ins1;
	Instances trainingSet;
	
	trainingSet.setAttributes('outlook','temperature','humidity','windy','play');
	trainingSet.add(ins1);
	test.buildClassifier(trainingSet);
	return 0;
}
